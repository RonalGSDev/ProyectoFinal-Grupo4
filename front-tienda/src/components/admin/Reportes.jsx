import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import ReporteTodo from './ReporteTodo'

const Reporte = () => {
  return (
    <Container className="mt-4">
      <h1 className="h1 text-center">REPORTES DE VENTAS</h1>
      
      <Tabs defaultActiveKey="cliente" id="reporte-tabs" className="mt-3">

        <Tab eventKey="todo" title="Todo">
            <div className="tab-content p-3">
                <h2>Listado de todas las ventas</h2>
                <p>Aquí se mostrar todas las ventas...</p>
                <ReporteTodo />
            </div>
            </Tab>

        <Tab eventKey="cliente" title="Cliente">
          <div className="tab-content p-3">
            <h2>Buscar por Cliente</h2>
            <p>Aquí puedes filtrar las ventas por cliente...</p>
            {/* Agrega aquí el contenido o formulario relacionado con cliente */}
          </div>
        </Tab>

        <Tab eventKey="producto" title="Producto">
          <div className="tab-content p-3">
            <h2>Buscar por Producto</h2>
            <p>Aquí puedes filtrar las ventas por producto...</p>
            {/* Agrega aquí el contenido o formulario relacionado con producto */}
          </div>
        </Tab>

        <Tab eventKey="rangoFecha" title="Rango de Fecha">
          <div className="tab-content p-3">
            <h2>Buscar por Rango de Fecha</h2>
            <p>Aquí puedes filtrar las ventas por un rango de fechas...</p>
            {/* Agrega aquí el contenido o formulario relacionado con rango de fecha */}
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Reporte;
