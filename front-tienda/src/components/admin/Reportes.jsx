import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import ReporteTodo from './ReporteTodo';
import ReporteCliente from './ReporteCliente';
import ReporteProducto from './ReporteProducto';
import ReportePorFecha from './ReportePorFecha';
import ComentariosProductos from './ComentariosProductos';

const Reporte = () => {
  return (
    <Container>
      <h1 className="h1 text-center">REPORTES DE VENTAS</h1>
      <Tabs defaultActiveKey="todo" id="reporte-tabs" className="mt-3">
        <Tab eventKey="todo" title="Todo">
          <div className="tab-content p-3">
            <h2 className='h2 mt-2 mb-3'>Listado de todas las ventas</h2>
            <ReporteTodo />
          </div>
        </Tab>
        <Tab eventKey="cliente" title="Cliente">
          <div className="tab-content p-3">
            <h2 className='h2 mt-2 mb-3'>Buscar por Cliente</h2>
            <ReporteCliente />
          </div>
        </Tab>
        <Tab eventKey="producto" title="Producto">
          <div className="tab-content p-3">
            <h2 className='h2 mt-2 mb-3'>Buscar por Producto</h2>
            <ReporteProducto />
          </div>
        </Tab>
        <Tab eventKey="rangoFecha" title="Rango de Fecha">
          <div className="tab-content p-3">
            <h2 className='h2 mt-2 mb-3'>Buscar por Rango de Fecha</h2>
            <ReportePorFecha />
          </div>
        </Tab>

        <Tab eventKey="comentarios" title="Comentarios">
          <div className="tab-content p-3">
            <h2 className='h2 mt-2 mb-3'>Comentarios de Productos</h2>
            <ComentariosProductos />
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Reporte;
