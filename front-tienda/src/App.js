// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavbarHome';
import Footer from './components/Footer';
import Home from './components/Home';
import LoginCliente from './components/clients/LoginCliente';
import LoginAdmin from './components/admin/LoginAdmin';
import RegistroCliente from './components/clients/RegistroCliente'; 
import PaginaCliente from './components/clients/PaginaCliente';
import PaginaAdmin from './components/admin/PaginaAdmin';
import './App.css';

function App() {

  const handleRegisterComplete = () => {
    console.log('Registro completado');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Routes>
          <Route path="/" element={<><NavBar /><Home /><Footer /></>} />
          <Route path="/login-cliente" element={<LoginCliente />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/registro-cliente" element={<RegistroCliente onRegisterComplete={handleRegisterComplete} />} /> 
          <Route path="/pagina-cliente/*" element={<><PaginaCliente /><Footer /></>} /> 
          <Route path="/pagina-admin/*" element={<><PaginaAdmin /><Footer /></>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
