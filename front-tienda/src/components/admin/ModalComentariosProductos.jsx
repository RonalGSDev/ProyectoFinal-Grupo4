import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Calificacion from '../clients/Calificacion'; // Asegúrate de que la ruta sea correcta

const ModalComentariosProductos = ({ idProducto, onClose }) => {
  const [comments, setComments] = useState([]);

  // Efecto para obtener comentarios de la API
  useEffect(() => {
    const fetchComments = async () => {
      if (!idProducto) return; // Asegúrate de que idProducto esté definido
      try {
        const response = await fetch(`http://localhost:8080/comentarios/listar/${idProducto}`);
        if (!response.ok) throw new Error('Error al obtener comentarios');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        Swal.fire('Error', 'No se pudieron cargar los comentarios', 'error');
      }
    };

    fetchComments();
  }, [idProducto]); // Dependencia de idProducto para actualizar cuando cambia

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Comentarios del Producto</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <h2>Comentarios Anteriores</h2>
            {comments.length > 0 ? (
              <ul className="list-group">
                {comments.map((comment) => (
                  <li key={comment.id} className="list-group-item">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                      <div className="mb-2 mb-md-0">
                        <strong>{comment.nombres}</strong>
                        <span className="mx-2">({new Date(comment.fecha).toLocaleDateString()})</span>
                      </div>
                      {/* Mostrar la calificación aquí sin permitir edición */}
                      <Calificacion rating={comment.calificacion} isEditable={false} />
                    </div>
                    <p>{comment.comentario}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay comentarios aún.</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComentariosProductos;
