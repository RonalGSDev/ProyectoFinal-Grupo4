// src/contex/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Almacena el rol del usuario
  const [clientId, setClientId] = useState(null); // Almacena el ID del cliente

  const login = (role, id) => {
    setUser(role);
    setClientId(id); // Almacena el ID del cliente al iniciar sesión
  };

  const logout = () => {
    setUser(null);
    setClientId(null); // Resetea el ID al cerrar sesión
    localStorage.removeItem('carrito'); // Limpia el localStorage del carrito al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, clientId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
