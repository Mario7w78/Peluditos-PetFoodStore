import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "@/data/config";
import styles from "@/styles/CarritoStyles";

const CarritoCompra = () => {
    const [productos, setProductos] = useState([]);
    const [carritoId, setCarritoId] = useState(null);
    const [contador, setContador] = useState(30);

    // Obtener usuario logueado
    const user = JSON.parse(localStorage.getItem("usuario"));

    // Obtener carrito del backend al montar
    useEffect(() => {
        if (!user) return;
        fetch(`${API_URL}/carrito/usuario/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setCarritoId(data.id);
                // Mapear productos con cantidad y datos necesarios
                setProductos(
                    (data.productos || []).map(p => ({
                        ...p,
                        cantidad: p.DetalleCarrito?.cantidad || 1,
                        precioUnitario: p.DetalleCarrito?.precioUnitario || p.precioUnitario,
                        imgurl: p.imgurl
                    }))
                );
            });
    }, [user]);

    // Contador de oferta
    useEffect(() => {
        if (contador > 0) {
            const timer = setInterval(() => setContador(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [contador]);

    // Actualizar cantidad en backend
    const actualizarCantidad = async (productoId, incremento) => {
        const prod = productos.find(p => p.id === productoId);
        if (!prod) return;
        const nuevaCantidad = Math.max(1, prod.cantidad + incremento);
        // Aquí deberías tener un endpoint para actualizar cantidad, por ahora eliminamos y volvemos a agregar
        await fetch(`${API_URL}/carrito/${carritoId}/producto/${productoId}`, { method: "DELETE" });
        await fetch(`${API_URL}/carrito/${carritoId}/producto`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productoId, cantidad: nuevaCantidad, precioUnitario: prod.precioUnitario })
        });
        // Refrescar productos
        fetch(`${API_URL}/carrito/usuario/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setProductos(
                    (data.productos || []).map(p => ({
                        ...p,
                        cantidad: p.DetalleCarrito?.cantidad || 1,
                        precioUnitario: p.DetalleCarrito?.precioUnitario || p.precioUnitario,
                        imgurl: p.imgurl
                    }))
                );
            });
    };

    // Eliminar producto del carrito
    const eliminarProducto = async (productoId) => {
        await fetch(`${API_URL}/carrito/${carritoId}/producto/${productoId}`, { method: "DELETE" });
        setProductos(productos.filter(p => p.id !== productoId));
    };

    // Calcular total
    const calcularTotal = () => {
        return productos.reduce((acc, prod) => acc + prod.precioUnitario * prod.cantidad, 0);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow p-6">
                <h1 className="text-2xl font-bold mb-4">Carro de Compra</h1>
                <div className="flex gap-6">
                    <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Productos Seleccionados</h2>
                        {productos.length > 0 ? (
                            <ul className="space-y-4">
                                {productos.map((prod) => (
                                    <li key={prod.id} className="flex items-center gap-4 border-b pb-2 mb-2">
                                        <img src={prod.imgurl} alt={prod.nombre} width={80} className="rounded" />
                                        <div>
                                            <p className="font-semibold">{prod.nombre}</p>
                                            <p>Precio: S/ {prod.precioUnitario.toFixed(2)}</p>
                                            <p>Cantidad: {prod.cantidad}</p>
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    className="bg-gray-300 px-2 py-1 rounded"
                                                    onClick={() => actualizarCantidad(prod.id, -1)}
                                                >-</button>
                                                <button
                                                    className="bg-gray-300 px-2 py-1 rounded"
                                                    onClick={() => actualizarCantidad(prod.id, 1)}
                                                >+</button>
                                            </div>
                                            <button onClick={() => eliminarProducto(prod.id)}
                                                className="text-red-500 mt-2">Eliminar</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay productos en el carrito.</p>
                        )}
                    </div>
                    <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Resumen de la compra</h2>
                        <p><strong>Productos:</strong> {productos.length}</p>
                        <p><strong>Total:</strong> S/ {calcularTotal().toFixed(2)}</p>
                        <Link to="/checkout">
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                                Continuar a Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
            <aside>
                <img src="src/images/Limited-offer.jpg" alt="centered image" className={styles.image_offer} />
                {contador > 0 && (
                    <div className="bg-red-500 text-white p-4 rounded-md text-center font-bold mb-4">
                        La oferta finalizara en {contador} segundos
                    </div>
                )}
            </aside>
        </div>
    );
};

export default CarritoCompra;
