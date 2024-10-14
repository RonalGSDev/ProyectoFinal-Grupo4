import React, { useState } from 'react';

const DetalleProducto = ({ producto, onRegresar }) => {
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad
  const [mensajeError, setMensajeError] = useState(''); // Estado para manejar mensajes de error

  const handleComprar = () => {
    // Verifica si la cantidad solicitada es mayor que el stock disponible
    if (cantidad > producto.stock) {
      setMensajeError(`Solo hay ${producto.stock} unidades disponibles.`);
    } else {
      setMensajeError(''); // Limpia el mensaje de error
      alert(`Has agregado ${cantidad} ${producto.nombre}(s) al carrito.`);
    }
  };

  return (
    <div className="container mt-5 mb-5">
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
              onChange={(e) => setCantidad(e.target.value)} // Actualiza la cantidad según la entrada del usuario
              min="1" 
              max={producto.stock} 
              className="form-control me-2" 
              style={{ width: '70px' }} 
            />
            <button className="btn btn-primary" onClick={handleComprar}>
              Comprar
            </button>
          </div>

          {/* Mensaje de error si la cantidad es mayor que el stock */}
          {mensajeError && <div className="alert alert-danger mt-3">{mensajeError}</div>}
        </div>
      </div>

      <h2 className="text-center mt-5">Productos Recomendados</h2>
      <div className="row mt-4">
        {[...Array(4)].map((_, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
            <div className="card h-100 border-light shadow-lg">
              <img 
                src="https://img.pacifiko.com/PROD/resize/1/1000x1000/YWRhMmMyMT_1.png" 
                alt={`Producto Recomendado ${index + 1}`} 
                className="card-img-top" 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body bg-light">
                <h5 className="card-title">Producto Recomendado {index + 1}</h5>
                <p className="card-text"><strong>Precio: Q</strong></p>
                <p className="card-text">Descripción breve.</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Comentarios */}
      <div className="row mt-5">
        <div className="col-md-6">
          <h3>Deja tu Comentario</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="comentario" className="form-label">Comentario</label>
              <textarea
                className="form-control"
                id="comentario"
                rows="3"
                placeholder="Escribe tu comentario aquí"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mb-4">Enviar Comentario</button>
          </form>
        </div>
        <div className="col-md-6">
          <h3>Comentarios Anteriores</h3>
          <ul className="list-group">
            <li className="list-group-item">Comentario 1: Muy buen producto.</li>
            <li className="list-group-item">Comentario 2: Excelente calidad.</li>
            <li className="list-group-item">Comentario 3: Lo recomiendo.</li>
            <li className="list-group-item">Comentario 4: Muy útil.</li>
            <li className="list-group-item">Comentario 5: Estoy satisfecho.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
