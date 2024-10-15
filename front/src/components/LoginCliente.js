import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistroCliente from './RegistroCliente';
import { useAuth } from '../contex/AuthContext'; 

const LoginCliente = () => {
  const navigate = useNavigate(); 
  // Obtener la función de login del contexto
  const { login } = useAuth();
  // Estado para manejar el cambio entre formularios
  const [isRegistering, setIsRegistering] = useState(false); 
  // Mensaje de error
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleLogin = async (e) => {
    e.preventDefault(); 
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:8080/clientes/login?correo=' + email + '&password=' + password, {
        method: 'POST',
      });

      if (response.ok) {
        // Si las credenciales son correctas, procesar la respuesta
        const data = await response.json(); 
        
        // Almacenar el rol y el idCliente en el contexto
        login('cliente', data.idCliente); // Cambiado para incluir el idCliente
        
        // Guardar el idCliente en el localStorage (si lo deseas)
        localStorage.setItem('idCliente', data.idCliente); 
        
        // Llevar a paginaCliente
        navigate('/pagina-cliente'); 
      } else {
        // Mostrar mensaje de error
        const errorData = await response.json(); 
        setErrorMessage(errorData.message); 
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage("Error al comunicarse con el servidor");
    }
  };

  const handleRegisterComplete = () => {
    setIsRegistering(false); // Vuelve a mostrar el formulario de inicio de sesión
  };

  return (
    <div className="container-fluid bg-secondary vh-100 d-flex align-items-center justify-content-center">
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-header text-center">
          <h2>{isRegistering ? 'Registrar Cliente' : 'Login Cliente'}</h2>
        </div>
        <div className="card-body">
          {isRegistering ? (
            <RegistroCliente onRegisterComplete={handleRegisterComplete} />
          ) : (
            <>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="password" required />
                </div>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
              </form>
              <button className="btn btn-secondary w-100 mt-3" onClick={() => setIsRegistering(true)}>
                ¿No tienes cuenta? Regístrate aquí
              </button>
            </>
          )}
          <button className="btn btn-danger w-100 mt-3" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCliente;
