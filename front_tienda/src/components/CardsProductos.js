import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCards = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para navegación

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/productos/listar');
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setError("No se pudieron cargar los productos."); // Establece el mensaje de error
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
    return <div className="text-center text-danger">{error}</div>; // Muestra el mensaje de error
  }

  return (
    <div className="container">
      <div className="row">
        {productos.map((producto) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={producto.id}>
            <div className="card h-100">
              <img 
                src={producto.url} 
                className="card-img-top" 
                alt={`imagen de ${producto.nombre}`} 
                style={{ height: '200px', objectFit: 'cover' }} // Asegúrate de que todas las imágenes tengan la misma altura
              />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">Precio: Q.{producto.precio}</p>
                <p className="card-text">Disponibilidad: {producto.stock}</p>
                <button 
                  className="btn btn-primary w-100" 
                  onClick={() => navigate(`/productos/${producto.id}`)} // Redirige a la página de detalles
                >
                  Ver Más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
