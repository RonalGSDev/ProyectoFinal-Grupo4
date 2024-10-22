import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBarCliente from './NavBarCliente';
import CardsCompras from './CardsCompras';
import Carrito from './Carrito';

const PaginaClientes = () => {
    return (
        <div>
            <NavBarCliente />
            <Routes>
                <Route path="/" element={<CardsCompras />} /> 
                <Route path="carrito" element={<Carrito />} /> {/* Sin barra antes de 'carrito' */}
            </Routes>
        </div>
    );
};

export default PaginaClientes;
