// src/App.js
import React, { useState } from 'react';
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
import Carrito from './components/Carrito'; // Asegúrate de tener el componente Carrito
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const handleMostrarCarrito = () => {
    setMostrarCarrito(true);
  };

  const handleCerrarCarrito = () => {
    setMostrarCarrito(false);
  };

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
                <NavBar onMostrarCarrito={handleMostrarCarrito} />
                <Main />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/pagina-admin" 
            element={
              <>
                <NavBar onMostrarCarrito={handleMostrarCarrito} />
                <PaginaAdmin />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/pagina-cliente" 
            element={
              <>
                <NavBar onMostrarCarrito={handleMostrarCarrito} />
                <PaginaCliente />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/producto" 
            element={
              <>
                <NavBar onMostrarCarrito={handleMostrarCarrito} />
                <Producto />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/clientes" 
            element={
              <>
                <NavBar onMostrarCarrito={handleMostrarCarrito} />
                <Clientes />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/administradores" 
            element={
              <>
                <NavBar onMostrarCarrito={handleMostrarCarrito} />
                <Administradores />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/carrito" 
            element={
              <>
                <Carrito onCerrarCarrito={handleCerrarCarrito} />
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
