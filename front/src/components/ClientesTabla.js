import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ClientesTable = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    telefono: '',
    direccion: '',
  });
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
        Swal.fire('¡Editado!', 'El cliente ha sido editado exitosamente.', 'success');
      } else {
        await axios.post('http://localhost:8080/clientes/guardar', formData);
        Swal.fire('¡Agregado!', 'El cliente ha sido agregado exitosamente.', 'success');
      }
      setFormData({
        id: '',
        nombre: '',
        apellidos: '',
        correo: '',
        password: '',
        telefono: '',
        direccion: '',
      });
      setIsEditing(false);
      setShowModal(false);
      fetchClientes();
    } catch (err) {
      Swal.fire('Error', 'Error al guardar el cliente.', 'error');
    }
  };

  const handleEdit = (cliente) => {
    setFormData(cliente);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (idCliente) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/clientes/eliminar/${idCliente}`);
        Swal.fire('¡Eliminado!', 'El cliente ha sido eliminado.', 'success');
        fetchClientes();
      } catch (err) {
        Swal.fire('Error', 'Error al eliminar el cliente.', 'error');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      id: '',
      nombre: '',
      apellidos: '',
      correo: '',
      password: '',
      telefono: '',
      direccion: '',
    });
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

    <div className='table-responsive'>
    <table className="table table-hover table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellidos}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(cliente)}>
                  <i className="bi bi-pencil-square"></i>
                </button>
                &nbsp;
                <button className="btn btn-danger" onClick={() => handleDelete(cliente.id)}>
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      

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
                  <span className='input-group-text'><i className="bi bi-person-fill"></i></span>
                  <input type="text" className="form-control" placeholder='Ingresa tu nombre' name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>

                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className="bi bi-person"></i></span>
                  <input type="text" className="form-control" name="apellidos" placeholder='Ingresa tus apellidos' value={formData.apellidos} onChange={handleChange} required />
                </div>

                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className="bi bi-envelope-at-fill"></i></span>
                  <input type="email" className="form-control" name="correo" placeholder='Ingresa tu correo' value={formData.correo} onChange={handleChange} required />
                </div>

                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className="bi bi-key-fill"></i></span>
                  <input type="password" className="form-control" name="password" placeholder='Ingresa tu contraseña' value={formData.password} onChange={handleChange} required />
                </div>

                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className="bi bi-phone-vibrate"></i></span>
                  <input type="text" className="form-control" name="telefono" placeholder='Ingresa tu teléfono' value={formData.telefono} onChange={handleChange} required />
                </div>

                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className="bi bi-house-fill"></i></span>
                  <input type="text" className="form-control" name="direccion" placeholder='Ingresa tu dirección' value={formData.direccion} onChange={handleChange} required />
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
