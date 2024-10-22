// src/components/RegistroCliente.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const RegistroCliente = ({ onRegisterComplete }) => {
  const navigate = useNavigate(); 
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/clientes/guardar', {
        nombre,
        apellidos,
        telefono,
        direccion,
        correo,
        password
      });

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: response.data,
      });

      // Indica que el registro se ha completado
      onRegisterComplete();
      // para regresar al loginCliente
      navigate('/login-cliente');
    } catch (error) {
      // Agrega este log para depurar
      console.log('Error:', error); 

      if (error.response) {
        // Detalles de la respuesta que resivimos del endpoint
        console.error('Response Error:', error.response.data); 
        Swal.fire({
          icon: 'error',
          title: 'Error en la solicitud',
          text: error.response.data || 'Error desconocido',
        });

      } else if (error.request) {
        console.error('Request Error:', error.request);
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo conectar al servidor.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error desconocido',
          text: error.message,
        });
      }
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-secondary">
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-header text-center">
          <h2>Registro Cliente</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellidos</label>
              <input
                type="text"
                className="form-control"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">Registrar Cliente</button>
          </form>
          <button className="btn btn-danger w-100 mt-3" onClick={() => navigate('/login-cliente')}>
            Regresar al Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistroCliente;
