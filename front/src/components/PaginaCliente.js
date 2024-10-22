// src/components/PaginaCliente.js
import React from 'react';
import CardsCompras from './CardsCompras';

const PaginaCliente = () => {
  return (
    <div className="container mt-5">
      <h1 className='h1 text-center'>Compra nuestros Productos</h1>
      
      <CardsCompras />
      
    </div>
  );
};

export default PaginaCliente;
