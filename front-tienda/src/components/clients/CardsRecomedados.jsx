// src/components/CardsRecomendados.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetalleProducto from './DetalleProducto';

const CardsRecomendados = () => {
  const [productosRecomendados, setProductosRecomendados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null); // Estado para el producto seleccionado

  const fetchRecomendados = async () => {
    try {
      const response = await axios.get('http://localhost:8080/comentarios/recomendados');
      const idsProductos = response.data.map(comentario => comentario.idProducto); // Obtener idProducto

      // Obtener detalles de los productos a partir de los ids
      const productosPromises = idsProductos.map(id => 
        axios.get(`http://localhost:8080/productos/buscar/${id}`) // Hacer solicitud para cada idProducto
      );

      const productosResponses = await Promise.all(productosPromises);
      const productos = productosResponses.map(res => res.data); // Almacenar los datos de productos

      setProductosRecomendados(productos); // Establecer los productos recomendados
    } catch (error) {
      console.error("Error al obtener los productos recomendados:", error);
      setError("No se pudieron cargar los productos recomendados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecomendados();
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

  return (
    <div className="container mt-5">
      <h1 className='h1 text-center mt-5 mb-5'>Productos Recomendados</h1>
      {error && <div className="text-center text-danger">{error}</div>}
      <div className="row">
        {productosRecomendados.length === 0 && !error ? (
          <div className="text-center">No hay productos recomendados disponibles.</div>
        ) : (
          productosRecomendados.map((producto) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default CardsRecomendados;
