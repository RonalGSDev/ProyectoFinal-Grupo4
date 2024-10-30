import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalComentariosProductos from './ModalComentariosProductos'; // Asegúrate de que la ruta sea correcta

const ComentariosProductos = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductoId, setSelectedProductoId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/productos/listar')
      .then(response => setProductos(response.data))
      .catch(() => setError('Error al cargar los datos.'));
  }, []);

  const handleOpenModal = (idProducto) => {
    setSelectedProductoId(idProducto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProductoId(null);
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="container mb-4">
      <div className='table-responsive shadow mt-4 mb-3'>
        <table className="table table-hover table-striped text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Ver comentarios</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>
                  <img src={producto.url} alt={`imagen de ${producto.nombre}`} width="100px" />
                </td>
                <td>
                  <button className='btn btn-success' onClick={() => handleOpenModal(producto.id)}>
                    <i className="bi bi-card-checklist"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ModalComentariosProductos idProducto={selectedProductoId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ComentariosProductos;
