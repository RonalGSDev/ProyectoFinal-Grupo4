// src/components/LoginCliente.js

import React, { useState } from 'react';

const LoginCliente = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes manejar el inicio de sesión
    console.log('Cliente Login:', { username, password });
  };

  return (
    <div className="container mt-5">
      <h2>Login Cliente</h2>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Usuario</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Ingrese su usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Iniciar Sesión
      </button>
    </div>
  );
};

export default LoginCliente;
