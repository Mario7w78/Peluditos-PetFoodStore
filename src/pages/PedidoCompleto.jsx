/*
1.- Mostrar el Header
2.- Mensaje de Orden Completada{
    Indicar los productos
    Mensaje de agradecimiento
    Boton para volver al menu}
3.- (Agregar algo adicional)
*/

import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { obtenerProductos } from "../data/productos";

const PedidoCompleto = () => {
    const navigate = useNavigate();
    const productos = obtenerProductos() || []; // Asegurar que es un array válido
    const numeroPedido = Math.floor(Math.random() * 90000) + 10000; // Número aleatorio de pedido
    const fechaEntrega = new Date();
    fechaEntrega.setDate(fechaEntrega.getDate() + 3); // Simulación de entrega en 3 días

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Pedido Completado</h1>
                <p className="text-lg mb-4">¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.</p>
                
                <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Detalles del Pedido</h2>
                    <p><strong>Número de Pedido:</strong> #{numeroPedido}</p>
                    <p><strong>Fecha Estimada de Entrega:</strong> {fechaEntrega.toLocaleDateString()}</p>

                    <h3 className="text-lg font-semibold mt-4">Productos en tu pedido:</h3>
                    <ul className="space-y-3">
                        {productos.map((prod) => (
                            <li key={prod.id} className="flex items-center gap-4 border-b pb-2">
                                <img src={prod.image} alt={prod.nombre} width={80} className="rounded" />
                                <div>
                                    <p><strong>{prod.nombre}</strong></p>
                                    <p>Cantidad: {parseInt(prod.cantidad, 10)}</p>
                                    <p>Precio Total: ${(prod.precio * parseInt(prod.cantidad, 10)).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link to="/">
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                        Volver al menú principal
                    </button>
                </Link>
            </main>
        </div>
    );
};

export default PedidoCompleto;
