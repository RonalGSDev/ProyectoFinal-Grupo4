import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalDetallesPedido from './ModalDetallesPedido';
const ReportePorFecha = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState(''); 
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedPedidoId, setSelectedPedidoId] = useState(null); 

  const fetchPedidos = async () => {
    if (!fechaInicio || !fechaFin) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingresa ambas fechas.',
      });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/pedidos/obtener?fechainicio=${fechaInicio}&fechafin=${fechaFin}`);
      setPedidos(response.data);
    } catch (error) {
      console.error('Error fetching pedidos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al obtener los pedidos. Intente nuevamente.',
      });
    }
  };

  // Función para abrir el modal con el ID del pedido
  const handleShowModal = (idPedido) => {
    setSelectedPedidoId(idPedido); // Guarda el ID del pedido seleccionado
    setShowModal(true); // Muestra el modal
  };
  // Cierra el modal
  const handleCloseModal = () => setShowModal(false); 

  return (
    <div className='mt-3 mb-4'>
      <div className='row mb-4'>
        <div className='col-md-3'>
          <input
            type="date"
            placeholder="Fecha de Inicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="form-control mb-2"
          />
        </div>

        <div className='col-md-3'>
          <input
            type="date"
            placeholder="Fecha de Fin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="form-control mb-2"
          />
        </div>

        <div className='col-md-3 col-sm-12'>
          <button onClick={fetchPedidos} className="btn btn-primary mb-2">
            Buscar
          </button>
        </div>
      </div>

      <div className='row'>
        <div className='col table-responsive'>
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
      </div>


      {showModal && (
        <ModalDetallesPedido 
          idPedido={selectedPedidoId} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default ReportePorFecha;
