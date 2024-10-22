import React from 'react';
import ProductCards from './ProductosCards';

const Home = () => {
  return (
    <div className="container mt-3 mb-3">
      <h1 className='h1 text-center mt-5'>Compra nuestros Productos</h1>
      <ProductCards />
    </div>
  );
};

export default Home;
