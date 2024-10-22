// src/components/RegistroCliente.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RegistroCliente = ({ onRegisterComplete }) => {
  const [nombre, setNombre] = useState(''); // Cambiado a 'nombre'
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/clientes/guardar', {
        nombre, // Usando 'nombre'
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
      
      onRegisterComplete(); // Indica que el registro se ha completado
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el servidor',
          text: 'Por favor intenta más tarde.',
        });
      }
    }
  };

  return (
    <div className="mb-3">
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
    </div>
  );
};

export default RegistroCliente;
