import React from 'react';
import ProuctosTabla from './ProductosTabla';
import LogoProductos  from '../img/LogoProductos.png'
import './Logos.css';

const Productos = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>Productos</h1>
      <img src={LogoProductos} alt='Logotipo de clientes' className='img-fluid logo mb-3'/>
      <ProuctosTabla></ProuctosTabla>
    </div>
  );
};

export default Productos;
