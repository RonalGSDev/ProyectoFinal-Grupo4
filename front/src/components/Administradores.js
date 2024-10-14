// src/components/Administradores.js
import React from 'react';
import AdministradoresTable from './AdministradoresTable';

import './Logos.css';

const Administradores = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>Administradores</h1>
      
      <AdministradoresTable />
    </div>
  );
};

export default Administradores;
