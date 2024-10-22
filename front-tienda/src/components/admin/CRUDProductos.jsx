import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LogoProductos from '../../img/LogoProductos.png';
import '../logos.css'

const CRUDProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    url: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/productos/listar');
      setProductos(response.data);
    } catch (err) {
      setError('Error al cargar los datos.');
      console.error(err);
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
        await axios.put('http://localhost:8080/productos/editar', formData);
        Swal.fire('Editado', 'Producto editado con éxito', 'success');
      } else {
        await axios.post('http://localhost:8080/productos/guardar', formData);
        Swal.fire('Agregado', 'Producto agregado con éxito', 'success');
      }
      setFormData({ id: '', nombre: '', descripcion: '', precio: '', stock: '', url: '' });
      setIsEditing(false);
      setShowModal(false);
      fetchProductos();
    } catch (err) {
      setError('Error al guardar el producto.');
      console.error(err);
      Swal.fire('Error', 'No se pudo guardar el producto', 'error');
    }
  };

  const handleEdit = (producto) => {
    setFormData(producto);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (idProducto) => {
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/productos/eliminar/${idProducto}`);
        fetchProductos();
        Swal.fire('Eliminado', 'Producto eliminado con éxito', 'success');
      } catch (err) {
        setError('Error al eliminar el producto.');
        console.error(err);
        Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: '', nombre: '', descripcion: '', precio: '', stock: '', url: '' });
    setIsEditing(false);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mb-5">

      <h1 className='text-center h1'>CRUD DE PRODUCTOS</h1>
      <img src={LogoProductos} alt='Logotipo de productos' className='d-block m-auto img-fluid logo mb-3' />

      <div className='d-flex justify-content-center'>
        <button className="btn btn-dark mb-3 w-50" onClick={() => setShowModal(true)}>
          <i className='fa-solid fa-circle-plus'></i> Agregar Producto
        </button>
      </div>

      <div className='table-responsive'>
        <table className="table table-hover table-striped">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(producto => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td><strong>Q.</strong> {producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                  <img src={producto.url} alt={`imagen de ${producto.nombre}`} width="100px" />
                </td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEdit(producto)} aria-label={`Editar ${producto.nombre}`}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  &nbsp;
                  <button className="btn btn-danger" onClick={() => handleDelete(producto.id)} aria-label={`Eliminar ${producto.nombre}`}>
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar/editar producto */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-hidden={!showModal}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <input type="hidden" name="id" value={formData.id} onChange={handleChange} />

                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className="bi bi-pc-display"></i></span>
                  <input type="text" className="form-control" placeholder='Nombre del Producto' name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>

                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className="bi bi-file-earmark-text"></i></span>
                  <textarea
                    className="form-control"
                    placeholder='Descripción del Producto'
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    maxLength={140}
                    required
                  />
                </div>

                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className="bi bi-cash"></i></span>
                  <input type="number" className="form-control" placeholder='Precio del Producto' name="precio" value={formData.precio} onChange={handleChange} required />
                </div>

                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className="bi bi-box-seam-fill"></i></span>
                  <input type="number" className="form-control" name="stock" placeholder='Stock disponible' value={formData.stock} onChange={handleChange} required />
                </div>

                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className="bi bi-link"></i></span>
                  <input type="text" className="form-control" name="url" placeholder='URL de la imagen' value={formData.url} onChange={handleChange} />
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Editar Producto' : 'Agregar Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRUDProductos;
