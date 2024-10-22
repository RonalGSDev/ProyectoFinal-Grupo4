// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia a 'react-dom/client'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Crea un root usando createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mantén el reportWebVitals
reportWebVitals();
