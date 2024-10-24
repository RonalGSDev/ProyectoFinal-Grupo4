import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalDetallesPedido from './ModalDetallesPedido'; // Asegúrate de importar el modal

const ReporteTodo = () => {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedidoId, setSelectedPedidoId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pedidos/obtener');
        setPedidos(response.data);
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  // Función para abrir el modal con el ID del pedido
  const handleShowModal = (idPedido) => {
    setSelectedPedidoId(idPedido); // Guarda el ID del pedido seleccionado
    setShowModal(true); // Muestra el modal
  };

  const handleCloseModal = () => setShowModal(false); // Cierra el modal

  return (
    <div className='mt-3 mb-4'>
      <div className="table-responsive shadow mt-4 mb-3">
        <table className="table table-hover table-striped text-center">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>ID Cliente</th>
              <th>Nombres y Apellidos</th>
              <th>Fecha</th>
              <th>Cantidad de Productos</th>
              <th>Total</th>
              <th>Ver detalles de compra</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido[0]}>
                <td>{pedido[0]}</td> 
                <td>{pedido[1]}</td> 
                <td>{pedido[2]}</td> 
                <td>{pedido[3]}</td>
                <td>{pedido[4]}</td> 
                <td>{pedido[5].toFixed(2)}</td>
                <td>
                  <button className='btn btn-success' onClick={() => handleShowModal(pedido[0])}>
                    <i className="bi bi-card-checklist"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para mostrar detalles del pedido */}
      {showModal && (
        <ModalDetallesPedido 
          idPedido={selectedPedidoId} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default ReporteTodo;
