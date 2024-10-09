import React from 'react';
import ClientesTable from './ClientesTabla';
import LogoClientes from '../img/LogoClientes.png'
import './Logos.css'

const Clientes = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>Clientes</h1>
      <img src={LogoClientes} alt='Logotipo de clientes' className='img-fluid logo mb-3'/>
        <ClientesTable />
    </div>
  );
};

export default Clientes;
