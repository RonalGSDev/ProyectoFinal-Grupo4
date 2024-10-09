import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Main from './components/Main';
import Clientes from './components/Clientes';
import Productos from './components/Productos';
import Ventas from './components/Ventas';
import ProductosDetalles from './components/ProductoDetalles'; // Importa el componente de detalles del producto
import './App.css';

function App() {
  return (
    <Router>
      <div id="root">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/productos/:idProducto" element={<ProductosDetalles />} /> {/* Ruta para ver el detalle del producto */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
