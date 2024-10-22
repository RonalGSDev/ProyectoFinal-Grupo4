// src/components/PaginaAdmin.js
import React from 'react';
import Logo from '../img/Logo.png'


const PaginaAdmin = () => {
  return (
    <div className="container mt-5 pt-5">
      <h1 className='h1 text-center'>Página Administrador</h1>
      <img src={Logo} alt='Logo' className='w-50 d-block m-auto'></img>
    </div>
  );
};

export default PaginaAdmin;
