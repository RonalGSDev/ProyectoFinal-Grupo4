import React from 'react';
import NavBarAdmin from './NavBarAdmin';
import Logo from '../../img/Logo.png';
import { Route, Routes } from 'react-router-dom';
import CRUDClientes from './CRUDClientes';
import CRUDProductos from './CRUDProductos';
import CRUDAdministradores from './CRUDAdministradores';
import Reportes from './Reportes';

const PaginaAdmin = () => {
  return (
    <div>
      <NavBarAdmin />

      <div className="container mt-2 pt-5">
        <Routes>
          <Route path="/" element={
            <div>
              <h1 className='h1 text-center'>Página Administrador</h1>
              <img src={Logo} alt='Logo' className='w-50 d-block m-auto' />
            </div>
          } /> 
          
          <Route path="crud-clientes" element={<CRUDClientes />} /> 
          <Route path="crud-productos" element={<CRUDProductos />} />
          <Route path='crud-administradores' element={<CRUDAdministradores />} />
          <Route path='reportes' element={<Reportes />} />
        </Routes>
      </div>
      
    </div>
  );
};

export default PaginaAdmin;
