// src/components/LoginAdmin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginAdmin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita el envío del formulario
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Realiza la validación
    try {
      const response = await fetch('http://localhost:8080/administradores/login?correo=' + email + '&password=' + password, {
        method: 'POST',
      });
      

      if (response.ok) {
        login('admin'); // Establece el estado de autenticación
        navigate('/pagina-admin'); // Redirige a la página del administrador
      } else {
        const errorData = await response.text();
        setErrorMessage(errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage("Error al comunicarse con el servidor");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-secondary">
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-header text-center">
          <h2>Login Admin</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="text" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" required />
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
          </form>
          <button className="btn btn-danger w-100 mt-3" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
