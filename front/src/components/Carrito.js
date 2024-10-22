import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

const GuardarPedido = () => {
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
        const response = await fetch(`http://localhost:8080/productos/buscar/${id}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error al obtener el producto');
        }
    };

    const cargarDetallesProductos = async () => {
        const detalles = {};
        for (const producto of productosCarrito) {
            try {
                const detalle = await obtenerDetallesProducto(producto.id);
                detalles[producto.id] = detalle;
            } catch (error) {
                console.error(error);
            }
        }
        setProductosDetalles(detalles);
    };

    useEffect(() => {
        if (productosCarrito.length > 0) {
            cargarDetallesProductos();
        }
    }, [productosCarrito]);

    const calcularTotal = () => {
        let sumaTotal = 0;
        for (const producto of productosCarrito) {
            const detalle = productosDetalles[producto.id];
            if (detalle) {
                sumaTotal += detalle.precio * producto.cantidad;
            }
        }
        setTotal(sumaTotal);
    };

    useEffect(() => {
        calcularTotal();
    }, [productosDetalles]);

    const handleSubmit = () => {
        if (!idCliente || !total) {
            alert('Por favor, verifica que el ID del cliente y el total estén disponibles.');
            return;
        }

        const data = {
            idcliente: idCliente,
            total: total,
            fecha: new Date().toISOString(),
        };

        fetch('http://localhost:8080/pedidos/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                alert('Pedido guardado con éxito.');
            } else {
                throw new Error('Error en la respuesta del servidor.');
            }
        })
        .catch(error => {
            alert('Error al guardar el pedido.');
            console.error('Error:', error);
        });
    };

    const eliminarProducto = (id) => {
        const nuevoCarrito = productosCarrito.filter(producto => producto.id !== id);
        setProductosCarrito(nuevoCarrito);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    };

    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <h1 className="text-center h1 mb-4">Carrito de Compras</h1>

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
                                                className="img-fluid" // Asegura que la imagen sea responsiva
                                                style={{ height: '300px', objectFit: 'cover' }} // Ajustar altura y mantener proporciones
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
                
                <h3 className="text-center mb-4">Total: Q{total.toFixed(2)}</h3>

                <center>
                <button className="btn btn-success mb-5" onClick={handleSubmit}>Realizar Pedido</button>
                </center>
            </div>
        </div>
    );
};

export default GuardarPedido;
