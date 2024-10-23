import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Logo from '../../img/Logo.png'; 

const NavBarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión (por ejemplo, eliminar el token de autenticación)
    console.log('Sesión cerrada'); 
    // Redirige al usuario a la página de inicio
    navigate('/'); // Asegúrate de que esta sea la ruta correcta de tu página de inicio
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
              <Link className="nav-link" to="/pagina-admin">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pagina-admin/crud-clientes">Clientes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pagina-admin/crud-productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pagina-admin/crud-administradores">Administradores</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pagina-admin/reportes">Reportes</Link>
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

export default NavBarAdmin;
