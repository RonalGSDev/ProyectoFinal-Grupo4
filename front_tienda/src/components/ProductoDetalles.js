import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetail = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Define navigate para regresar

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/productos/buscar/${idProducto}`);
        setProducto(response.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto(); // Llama a la función fetchProducto dentro del useEffect
  }, [idProducto]); // Solo depende de idProducto

  const handleRegresar = () => {
    navigate(-1); // Navega hacia atrás a la página anterior
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (!producto) {
    return <div className="text-center">Producto no encontrado</div>;
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-6">
          <h1 className='text-center mb-3'><strong>{producto.nombre}</strong></h1>
          <img
            src={producto.url}
            alt={`Imagen de ${producto.nombre}`}
            className="img-fluid shadow"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>

        <div className="col-md-6 d-flex align-items-center mt-4 mb-4">
          <div>
            <h2 className='text-center mb-3'>{producto.nombre}</h2>
            <p><strong>Precio:</strong> Q.{producto.precio}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <button className="btn btn-secondary mt-2" onClick={handleRegresar}>
             Regresar
            </button>
          </div>
          
        </div>
      </div>

      <div className='row d-flex justify-content-center align-items-center'>
        <div className="container mt-3">
          <h2>Enviar Comentario</h2>
          <form>
            <div className='row'>
              <div className='col-md-4'>
                <label htmlFor="nombre" className="form-label">Código Cliente</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Escribe tu nombre"
                  required
                />
              </div>

              <div className='col-md-4'>
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Escribe tu nombre"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="comentario" className="form-label">Comentario</label>
              <textarea
                className="form-control"
                id="comentario"
                rows="3"
                placeholder="Escribe tu comentario"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar Comentario</button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
