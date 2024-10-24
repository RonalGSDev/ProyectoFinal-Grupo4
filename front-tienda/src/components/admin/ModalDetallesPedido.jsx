import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModalDetallesPedido = ({ idPedido, onClose }) => {
  const [detallesPedido, setDetallesPedido] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (idPedido) {
      const fetchDetallesPedido = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/detallepedido/obtener?idpedido=${idPedido}`);
          setDetallesPedido(response.data);
          setError(null);
        } catch (error) {
          console.error('Error al obtener los detalles del pedido:', error);
          setError('Error al cargar los detalles del pedido');
        }
      };
      fetchDetallesPedido();
    }
  }, [idPedido]);

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-lg"> {/* Cambia el tamaño del modal */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalles del Pedido {idPedido}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body table-responsive">
            {error ? (
              <div className="alert alert-danger">{error}</div>
            ) : detallesPedido.length > 0 ? (
              <table className="table table-hover table-striped text-center">
                <thead>
                  <tr>
                    <th>ID Producto</th>
                    <th>Nombre</th>
                    <th>URL</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detallesPedido.map((detalle) => (
                    <tr key={detalle[0]}> 
                      <td>{detalle[0]}</td>
                      <td>{detalle[1]}</td>
                      <td><img src={detalle[2]} alt={detalle[1]} style={{ width: '50px' }} /></td>
                      <td>{detalle[4]}</td> 
                      <td>{detalle[3].toFixed(2)}</td>
                      <td>{detalle[5].toFixed(2)}</td> 
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay detalles disponibles para este pedido.</p>
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

export default ModalDetallesPedido;
