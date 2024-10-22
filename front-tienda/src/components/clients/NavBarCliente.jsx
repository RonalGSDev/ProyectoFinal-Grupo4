import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Logo from '../../img/Logo.png'; 

const NavBarCliente = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('carrito');
    localStorage.removeItem('idCliente');
    localStorage.removeItem('idPedido');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <img src={Logo} alt='Logo Principal' style={{ width: 'auto', height: '80px' }} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav fs-5 ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/pagina-cliente">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pagina-cliente/carrito">Carrito</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={handleLogout}>Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarCliente;
