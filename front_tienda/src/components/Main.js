import React from 'react';
import CardsProductos from './CardsProductos';

const Main = () => {
  return (
    <div className="container">
      <h1 className='text-center mt-4 mb-4'>Nuestros Productos</h1>
      <CardsProductos></CardsProductos>
    </div>
  );
};

export default Main;
