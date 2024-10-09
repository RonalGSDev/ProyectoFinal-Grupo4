import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ClientesTable = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ id: '', nombre: '', apellido: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/clientes/listar');
      setClientes(response.data);
    } catch (err) {
      setError('Error al cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put('http://localhost:8080/clientes/editar', formData);
      } else {
        await axios.post('http://localhost:8080/clientes/guardar', formData);
      }
      setFormData({ id: '', nombre: '', apellido: '' });
      setIsEditing(false);
      setShowModal(false);
      fetchClientes();
    } catch (err) {
      setError('Error al guardar el cliente.');
    }
  };

  const handleEdit = (cliente) => {
    setFormData(cliente);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (idCliente) => {
    try {
      await axios.delete(`http://localhost:8080/clientes/eliminar/${idCliente}`);
      fetchClientes();
    } catch (err) {
      setError('Error al eliminar el cliente.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: '', nombre: '', apellido: '' });
    setIsEditing(false);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (

    <div className="container">

      <button className="btn btn-dark mb-3 w-50 mb-4" onClick={() => setShowModal(true)}>
        <i className='fa-solid fa-circle-plus'></i> Agregar Cliente
      </button>

      <table className="table table-hover table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(cliente)}>
                  <i className='fa-solid fa-edit'></i>
                </button>
                &nbsp;
                <button className="btn btn-danger" onClick={() => handleDelete(cliente.id)}>
                  <i className='fa-solid fa-trash'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar/editar cliente */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-hidden={!showModal}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isEditing ? 'Editar Cliente' : 'Agregar Cliente'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">

                <input type="hidden" name="id" value={formData.id} onChange={handleChange} />
                
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                  <input type="text" className="form-control" placeholder='Ingresa tu nombre' name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>

                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-regular fa-user'></i></span>
                  <input type="text" className="form-control" name="apellido" placeholder='Ingresa tu apellido' value={formData.apellido} onChange={handleChange} required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Editar Cliente' : 'Agregar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientesTable;
