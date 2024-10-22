// src/components/CardsCompras.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetalleProducto from './DetalleProducto';

const CardsCompras = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null); // Estado para el producto seleccionado

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/productos/listar');
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleAddToCart = (producto) => {
    setSelectedProducto(producto); // Establecer el producto seleccionado
  };

  const handleRegresar = () => {
    setSelectedProducto(null); // Limpiar el producto seleccionado
  };

  if (selectedProducto) {
    return <DetalleProducto producto={selectedProducto} onRegresar={handleRegresar} />; // Pasar la función de regresar
  }

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {productos.map((producto) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={producto.id}>
            <div className="card h-100 border-light shadow-lg">
              <img 
                src={producto.url} 
                className="card-img-top" 
                alt={`imagen de ${producto.nombre}`} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body bg-light">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text"><strong>Precio: Q</strong>{producto.precio}</p>
                <p className={`card-text ${producto.stock === 0 ? 'text-danger' : 'text-primary'}`}>
                  Disponibles: {producto.stock}
                </p>
                <button 
                  className="btn btn-primary w-100" 
                  onClick={() => handleAddToCart(producto)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsCompras;
