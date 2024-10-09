import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p className="mb-0">&copy; 2024 Grupo 4.</p>
        <p>Todos los derechos reservados.</p>
        <p className="mb-0">Nuestras Redes</p>
        <div>
          <a href="https://facebook.com" className="text-white mx-2"><i class="fa-brands fa-facebook"></i></a>
          <a href="https://www.linkedin.com" className="text-white mx-2"><i class="fa-brands fa-linkedin"></i></a>
          <a href="https://github.com" className="text-white mx-2"><i class="fa-brands fa-github"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
