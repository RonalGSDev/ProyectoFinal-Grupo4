import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const ReporteTodo = () => {
  const [pedidos, setPedidos] = useState([]);
  const [show, setShow] = useState(false);
  const [productos, setProductos] = useState([]);
  const [pedidoId, setPedidoId] = useState(null);

  useEffect(() => {
    // Aquí puedes llamar a tu API para obtener los pedidos
    const fetchPedidos = async () => {
      const response = await axios.get('http://localhost:8080/pedidos/listar');
      setPedidos(response.data);
    };

    fetchPedidos();
  }, []);

  const handleClose = () => setShow(false);
  
  const handleShow = async (idPedido) => {
    setPedidoId(idPedido);
    // Llama a la API para obtener los productos del pedido
    const response = await axios.get(`http://localhost:8080/detallepedido/${idPedido}/listar`);
    setProductos(response.data);
    setShow(true);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Cantidad de Productos</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{`${pedido.nombre} ${pedido.apellidos}`}</td>
              <td>{pedido.fechaPedido}</td>
              <td>{pedido.cantidadProductos}</td>
              <td>{pedido.total}</td>
              <td>
                <Button variant="primary" onClick={() => handleShow(pedido.id)}>
                  Ver Detalles
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Pedido #{pedidoId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Producto</th>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td><img src={producto.url} alt={producto.nombre} style={{ width: '50px' }} /></td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.precio}</td>
                  <td>{(producto.cantidad * producto.precio).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReporteTodo;
