// src/components/ProductCards.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductCards = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                <div className="d-flex flex-column" style={{ maxHeight: '60px', overflow: 'hidden' }}>
                  <p className="card-text text-truncate">{producto.descripcion}</p>
                </div>
                <p className="card-text"><strong>Precio: Q</strong>{producto.precio}</p>
                <p className={`card-text ${producto.stock === 0 ? 'text-danger' : 'text-primary'}`}>
                  Disponibles: {producto.stock}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
