import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Comentarios from './Commentarios';
import CardsRecomendados from './CardsRecomedados';

const DetalleProducto = ({ producto, onRegresar }) => {
  const [cantidad, setCantidad] = useState(1);
  const [mensajeError, setMensajeError] = useState('');
  const [carrito, setCarrito] = useState([]);

  const handleComprar = () => {
    // Convierte la cantidad ingresada a número
    const cantidadIngresada = Number(cantidad);
    const cantidadActual = carrito.find(item => item.id === producto.id)?.cantidad || 0;

    // Calcula el total si se agrega el nuevo producto
    const totalConNuevasUnidades = cantidadActual + cantidadIngresada;

    // Verifica si la cantidad solicitada es mayor que el stock disponible
    if (totalConNuevasUnidades > producto.stock) {
      setMensajeError(`Solo hay ${producto.stock} unidades disponibles.`);
    } else {
      setMensajeError('');

      const nuevoProducto = { id: producto.id, cantidad: cantidadIngresada };

      // Agrega el nuevo producto al carrito y lo guarda en localStorage
      setCarrito((prevCarrito) => {
        const existeProducto = prevCarrito.find(item => item.id === producto.id);

        let nuevoCarrito;
        if (existeProducto) {
          nuevoCarrito = prevCarrito.map(item =>
            item.id === producto.id
              ? { ...item, cantidad: Number(item.cantidad) + cantidadIngresada } // Suma la cantidad
              : item
          );
        } else {
          nuevoCarrito = [...prevCarrito, nuevoProducto];
        }

        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
        return nuevoCarrito;
      });

      // Muestra una alerta de confirmación usando SweetAlert2
      Swal.fire({
        title: '¡Producto agregado!',
        text: `${cantidadIngresada} ${producto.nombre}`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 1000,
      });
    }
  };

  useEffect(() => {
    // Cargar el carrito al montar el componente
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h1 className='h1 text-center mt-5 mb-5'>Compra nuestros Productos</h1>
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
              onChange={(e) => setCantidad(Number(e.target.value))} // Asegúrate de que la cantidad sea un número
              min="1"
              max={producto.stock}
              className="form-control me-0"
              style={{ width: '70px' }}
            />
            <button className="btn btn-primary ms-1" onClick={handleComprar}>
              Comprar
            </button>
          </div>

          {mensajeError && <div className="alert alert-danger mt-3">{mensajeError}</div>}
        </div>
      </div>

      <CardsRecomendados />
      <Comentarios idProducto={producto.id} />

    </div>
  );
};

export default DetalleProducto;
