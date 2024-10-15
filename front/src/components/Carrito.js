import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios'; // Asegúrate de tener axios instalado
import './Carrito.css'; // Asegúrate de crear este archivo para los estilos.

const Carrito = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [productosDetalles, setProductosDetalles] = useState({});
  const [idCliente, setIdCliente] = useState(''); // Estado para el ID del cliente

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setProductosCarrito(JSON.parse(carritoGuardado));
    }

    // Obtener el ID del cliente de localStorage
    const clienteIdGuardado = localStorage.getItem('clienteId'); // Ejemplo de almacenamiento en localStorage
    if (clienteIdGuardado) {
      setIdCliente(clienteIdGuardado); // Asigna el ID del cliente
    }
  }, []);

  useEffect(() => {
    const obtenerDetallesProductos = async () => {
      const detalles = {};
      for (const producto of productosCarrito) {
        const response = await fetch(`http://localhost:8080/productos/buscar/${producto.id}`);
        if (response.ok) {
          const data = await response.json();
          detalles[producto.id] = data; // Almacena el producto por su ID
        }
      }
      setProductosDetalles(detalles);
    };

    if (productosCarrito.length > 0) {
      obtenerDetallesProductos();
    }
  }, [productosCarrito]);

  const eliminarProducto = (id) => {
    const nuevosProductos = productosCarrito.filter((producto) => producto.id !== id);
    setProductosCarrito(nuevosProductos);
    localStorage.setItem('carrito', JSON.stringify(nuevosProductos));
  };

  const calcularTotal = () => {
    return productosCarrito.reduce((total, producto) => {
      const precio = productosDetalles[producto.id]?.precio || 0; // Obtener el precio del producto
      return total + precio * producto.cantidad; // Sumar el subtotal al total
    }, 0);
  };

  const realizarCompra = async () => {
    const total = calcularTotal();
    const fechaActual = new Date().toISOString().split('T')[0]; // Obtener fecha actual en formato yyyy-MM-dd
    const pedidoData = {
      idCliente: idCliente, // Enviar el ID del cliente
      fecha: fechaActual, // Enviar la fecha actual
      total: total, // Enviar el total calculado
    };

    try {
      const response = await axios.post('http://localhost:8080/pedidos/guardar', pedidoData, {
        headers: {
          'Content-Type': 'application/json', // Asegurarse de que el tipo de contenido sea JSON
        },
      });
      alert('Compra realizada con éxito!');
      // Limpiar el carrito después de la compra
      setProductosCarrito([]);
      localStorage.removeItem('carrito');
    } catch (err) {
      alert('Error al realizar la compra. Intente nuevamente.');
      console.error(err); // Para ver el error en la consola
    }
  };

  return (
    <div>
      <NavBar />
      <h1 className='mt-5 text-center mb-5'>Carrito de Compras</h1>
      {productosCarrito.length > 0 ? (
        <div className="container">
          <div className="row">
            {productosCarrito.map((producto) => (
              <div key={producto.id} className="col-12 mb-4 d-flex justify-content-center">
                <div className="card">
                  {productosDetalles[producto.id] ? (
                    <div className="d-flex flex-column flex-md-row">
                      <img
                        src={productosDetalles[producto.id].url}
                        alt={productosDetalles[producto.id].nombre}
                        className="card-img-top imagen-producto"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{productosDetalles[producto.id].nombre}</h5>
                        <p className="card-text">{productosDetalles[producto.id].descripcion}</p>
                        <p className="card-text">Precio: Q{productosDetalles[producto.id].precio}</p>
                        <p className="card-text">Cantidad: {producto.cantidad}</p>
                        <p className="card-text">Subtotal: Q{productosDetalles[producto.id].precio * producto.cantidad}</p>
                        <button className='btn btn-danger' onClick={() => eliminarProducto(producto.id)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>Cargando detalles...</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Mostrar el total */}
          <div className="d-flex justify-content-center mb-4">
            <h4>Total: Q{calcularTotal()}</h4>
          </div>
          {/* Botón "Realizar Compra" al final de las tarjetas, centrado */}
          <center>
            <button className="btn btn-success" onClick={realizarCompra}>
              Realizar Compra
            </button>
          </center>
        </div>
      ) : (
        <h4 className='text-center text-danger'>No hay productos en el carrito.</h4>
      )}
    </div>
  );
};

export default Carrito;
