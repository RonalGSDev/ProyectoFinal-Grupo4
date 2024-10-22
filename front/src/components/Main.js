// src/components/Main.js
import React from 'react';
import ProductCards from './ProductCards';

const Main = () => {
  return (
    <div>
      <h2 className="text-center mt-5">Nuestros Productos</h2>
      <ProductCards />
    </div>
  );
};

export default Main;
