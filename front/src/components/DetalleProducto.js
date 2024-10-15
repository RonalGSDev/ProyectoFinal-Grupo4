import React, { useState, useEffect } from 'react';

const DetalleProducto = ({ producto, onRegresar }) => {
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad
  const [mensajeError, setMensajeError] = useState(''); // Estado para manejar mensajes de error
  const [carrito, setCarrito] = useState([]); // Estado para el carrito

  const handleComprar = () => {
    // Verifica si la cantidad solicitada es mayor que el stock disponible
    if (cantidad > producto.stock) {
      setMensajeError(`Solo hay ${producto.stock} unidades disponibles.`);
    } else {
      setMensajeError(''); // Limpia el mensaje de error
      const nuevoProducto = { id: producto.id, cantidad: cantidad }; // Crea un objeto del nuevo producto

      // Agrega el nuevo producto al carrito
      setCarrito((prevCarrito) => {
        const nuevoCarrito = [...prevCarrito, nuevoProducto]; // Combina el carrito anterior con el nuevo producto
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito)); // Guarda el carrito en localStorage
        return nuevoCarrito; // Devuelve el nuevo carrito
      });

      alert(`Has agregado ${cantidad} ${producto.nombre} al carrito.`);
    }
  };

  // Cargar el carrito al montar el componente
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado)); // Carga el carrito guardado
    }
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-dark me-3 fs-5" onClick={onRegresar}>
              <i className="bi bi-arrow-left"></i>
            </button>
            <h1 className='text-center'>{producto.nombre}</h1>
          </div>
          <img
            src={producto.url}
            alt={`Imagen de ${producto.nombre}`}
            className="img-fluid shadow"
            style={{ maxHeight: '500px', width: 'auto', objectFit: 'contain' }}
          />
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center mt-4 mb-4">
          <h2 className='mb-3'>{producto.nombre}</h2>
          <p><strong>Precio:</strong> Q.{producto.precio}</p>
          <p><strong>Stock:</strong> {producto.stock}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>

          <div className="d-flex align-items-center mt-2">
            <input 
              type="number" 
              value={cantidad} 
              onChange={(e) => setCantidad(e.target.value)} 
              min="1" 
              max={producto.stock} 
              className="form-control me-0" // Cambiado de me-2 a me-0 para quitar el margen
              style={{ width: '70px' }} 
            />
            <button className="btn btn-primary ms-1" onClick={handleComprar}> {/* Agregado ms-0 para quitar margen izquierdo */}
              Comprar
            </button>
          </div>

          {mensajeError && <div className="alert alert-danger mt-3">{mensajeError}</div>}
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
