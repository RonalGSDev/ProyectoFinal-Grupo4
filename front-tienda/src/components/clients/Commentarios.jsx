import React, { useState, useEffect } from 'react';
import Calificacion from './Calificacion';
import Swal from 'sweetalert2';

const Comentarios = ({ idProducto }) => {
  const [comments, setComments] = useState([]);
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(0);

  // Efecto para obtener comentarios de la API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/comentarios/listar/${idProducto}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener comentarios');
        }

        const data = await response.json();
        setComments(data); // Actualiza el estado con los comentarios obtenidos
      } catch (error) {
        console.error('Error fetching comments:', error);
        Swal.fire('Error', 'No se pudieron cargar los comentarios', 'error');
      }
    };

    fetchComments();
  }, [idProducto]); // Ejecutar cada vez que idProducto cambie

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !comentario || !calificacion) {
      Swal.fire('Por favor, completa todos los campos', '', 'warning');
      return; 
    }

    const fechaActual = new Date().toISOString().split('T')[0]; // Formato yyyy-MM-dd
    const idCliente = localStorage.getItem('idCliente'); 

    const nuevoComentario = {
      idCliente,
      nombres: nombre,
      idProducto: idProducto.toString(),
      calificacion: calificacion.toString(),
      comentario: comentario,
      fecha: fechaActual,
    };

    try {
      const response = await fetch('http://localhost:8080/comentarios/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoComentario),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el comentario');
      }

      const result = await response.json();
      console.log('Comentario guardado:', result);

      // Agregar el nuevo comentario al estado
      setComments([nuevoComentario, ...comments]);
      setNombre('');
      setComentario('');
      setCalificacion(0);
      Swal.fire('¡Comentario enviado!', '', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar el comentario', 'error');
    }
  };

  return (
    <div className="container mt-5 shadow-lg p-4">
      <div className="row ">
        <div className="col-md-6">
          <h2 className='mb-3'>Escribe tu comentario</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">¿Qué te pareció este producto?</label>
              <Calificacion setRating={setCalificacion} rating={calificacion} /> 
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre y apellido</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comentario sobre el producto</label>
              <textarea
                className="form-control"
                id="comment"
                rows="3"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar Comentario</button>
          </form>
        </div>

        <div className="col-md-6">
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
         
                    <Calificacion rating={parseInt(comment.calificacion)} isEditable={false} />
                  </div>
                  <p>{comment.comentario}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay comentarios aún.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comentarios;
