// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contex/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoginAdmin from './components/LoginAdmin';
import LoginCliente from './components/LoginCliente';
import PaginaAdmin from './components/PaginaAdmin';
import PaginaCliente from './components/PaginaCliente';
import Main from './components/Main';
import Producto from './components/Productos'; 
import Clientes from './components/Clientes';
import Administradores from './components/Administradores'; // Importa el componente de administradores
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas de Login */}
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login-cliente" element={<LoginCliente />} />

          {/* Otras Rutas */}
          <Route 
            path="/" 
            element={
              <>
                <NavBar />
                <Main />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/pagina-admin" 
            element={
              <>
                <NavBar />
                <PaginaAdmin />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/pagina-cliente" 
            element={
              <>
                <NavBar />
                <PaginaCliente />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/producto" 
            element={
              <>
                <NavBar />
                <Producto />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/clientes" 
            element={
              <>
                <NavBar />
                <Clientes />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/administradores" 
            element={
              <>
                <NavBar />
                <Administradores />
                <Footer />
              </>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
