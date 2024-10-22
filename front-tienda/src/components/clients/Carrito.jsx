import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Carrito = () => {
    const [idCliente, setIdCliente] = useState('');
    const [total, setTotal] = useState(0);
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [productosDetalles, setProductosDetalles] = useState({});

    useEffect(() => {
        const clienteId = localStorage.getItem('idCliente');
        if (clienteId) {
            setIdCliente(clienteId);
        }

        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        setProductosCarrito(carrito);
    }, []);

    const obtenerDetallesProducto = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/productos/buscar/${id}`);
            if (!response.ok) throw new Error('Error al obtener el producto');
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const cargarDetallesProductos = async () => {
        const detalles = {};
        for (const producto of productosCarrito) {
            const detalle = await obtenerDetallesProducto(producto.id);
            if (detalle) detalles[producto.id] = detalle;
        }
        setProductosDetalles(detalles);
    };

    useEffect(() => {
        if (productosCarrito.length > 0) cargarDetallesProductos();
    }, [productosCarrito]);

    const calcularTotal = () => {
        let sumaTotal = 0;
        for (const producto of productosCarrito) {
            const detalle = productosDetalles[producto.id];
            if (detalle) sumaTotal += detalle.precio * producto.cantidad;
        }
        setTotal(sumaTotal);
    };

    useEffect(() => {
        calcularTotal();
    }, [productosDetalles]);

    const enviarDetallesPedido = async (detallesPedido) => {
        try {
            const response = await fetch('http://localhost:8080/detallepedido/guardarTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(detallesPedido),
            });
            if (!response.ok) throw new Error('Error al guardar los detalles del pedido.');
            return await response.json(); 
        } catch (error) {
            console.error('Error al enviar los detalles del pedido:', error);
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!idCliente || !total) {
            Swal.fire('Error', 'Verifica que el ID del cliente y el total estén disponibles.', 'error');
            return;
        }

        const data = {
            idcliente: idCliente,
            total: total,
            fecha: new Date().toISOString(),
        };

        try {
            const response = await fetch('http://localhost:8080/pedidos/guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Error al guardar el pedido.');

            const savedPedido = await response.json();
            const idPedido = savedPedido.id;

            if (!idPedido) throw new Error('El ID del pedido es nulo');

            const detallesPedido = productosCarrito.map(producto => ({
                idpedido: idPedido,
                idproducto: producto.id,
                cantidad: producto.cantidad,
            }));

            await enviarDetallesPedido(detallesPedido);
            await Swal.fire('Éxito', 'Tu pedido ha sido realizado con exito.', 'success');

            // Limpiar el carrito
            setProductosCarrito([]);
            localStorage.removeItem('carrito');
            localStorage.removeItem('idPedido');

        } catch (error) {
            await Swal.fire('Éxito', 'Tu pedido ha sido realizado con exito.', 'success');
            console.error('Error:', error);
        }
    };

    const eliminarProducto = (id) => {
        const nuevoCarrito = productosCarrito.filter(producto => producto.id !== id);
        setProductosCarrito(nuevoCarrito);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    };

    return (
        <div>
            <div className="container mt-5">
                <h1 className="text-center h1 mb-4">Carrito de Compras</h1>

                {productosCarrito.length === 0 ? (
                    <h3 className="text-center mb-4 text-danger">El carrito está vacío.</h3>
                ) : (
                    <div className="row">
                        {productosCarrito.map((producto) => (
                            <div key={producto.id} className="col-12 mb-4 d-flex justify-content-center">
                                <div className="card" style={{ width: '1000px', margin: '10px' }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            {productosDetalles[producto.id] ? (
                                                <img
                                                    src={productosDetalles[producto.id].url}
                                                    alt={productosDetalles[producto.id].nombre}
                                                    className="img-fluid"
                                                    style={{ height: '300px', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <p>Cargando imagen...</p>
                                            )}
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                {productosDetalles[producto.id] ? (
                                                    <>
                                                        <h5 className="card-title">{productosDetalles[producto.id].nombre}</h5>
                                                        <p className="card-text">{productosDetalles[producto.id].descripcion}</p>
                                                        <p className="card-text">Precio: Q{productosDetalles[producto.id].precio}</p>
                                                        <p className="card-text">Cantidad: {producto.cantidad}</p>
                                                        <p className="card-text">Subtotal: Q{(productosDetalles[producto.id].precio * producto.cantidad).toFixed(2)}</p>
                                                        <button className="btn btn-danger" onClick={() => eliminarProducto(producto.id)}>
                                                            Eliminar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <p>Cargando detalles...</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))} 
                    </div>
                )}

                {productosCarrito.length > 0 && (
                    <>
                        <h3 className="text-center mb-4">Total: Q{total.toFixed(2)}</h3>
                        <center>
                            <button className="btn btn-success mb-5" onClick={handleSubmit}>Realizar Pedido</button>
                        </center>
                    </>
                )}
            </div>
        </div>
    );
};

export default Carrito;
