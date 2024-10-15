// src/components/NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contex/AuthContext';
import Logo from '../img/Logo.png';

const NavBar = ({ onMostrarCarrito }) => { // Prop para manejar el carrito
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('idCliente'); // Eliminar idCliente del localStorage
    navigate('/'); // Redirigir al Main después de cerrar sesión
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <img src={Logo} alt='Logo Principal' style={{ width: 'auto', height: '80px' }} />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav fs-5 ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login-cliente">Clientes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login-admin">Administradores</Link>
                </li>
              </>
            ) : user === 'admin' ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/pagina-admin">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/producto">Productos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/clientes">Clientes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/administradores">Administradores</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/pagina-cliente">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-light" to="/carrito">Carrito</Link> {/* Cambiado a Link para redirigir */}
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Cerrar Sesión</button>
                </li>     
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
