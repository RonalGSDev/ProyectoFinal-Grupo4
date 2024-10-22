import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/Logo.png';

const NavBar = () => {
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
              <Link className="nav-link" to="/login-cliente">Clientes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login-admin">Administradores</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
