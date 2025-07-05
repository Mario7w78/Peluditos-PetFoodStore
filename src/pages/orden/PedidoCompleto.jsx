/*
1.- Mostrar el Header
2.- Mensaje de Orden Completada{
    Indicar los productos
    Mensaje de agradecimiento
    Boton para volver al menu}
3.- (Agregar algo adicional)
*/

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "@/data/config";

const PedidoCompleto = () => {
    const [orden, setOrden] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("usuario"));
    const fechaEntrega = new Date();
    fechaEntrega.setDate(fechaEntrega.getDate() + 3); // Simulación de entrega en 3 días

    useEffect(() => {
        if (!user) return;
        // Obtener la última orden del usuario
        fetch(`${API_URL}/orden/${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    // Tomar la última orden
                    setOrden(data[data.length - 1]);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [user]);

    if (loading) return <p className="text-center mt-10 text-gray-500">Cargando...</p>;

    return (
        <div className="min-h-screen flex flex-col">
            
            <main className="flex-grow p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Pedido Completado</h1>
                <p className="text-lg mb-4">¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.</p>

                <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Detalles del Pedido</h2>
                    {orden ? (
                        <>
                            <p><strong>Número de Pedido:</strong> #{orden.id}</p>
                            <p><strong>Fecha Estimada de Entrega:</strong> {fechaEntrega.toLocaleDateString()}</p>

                            <h3 className="text-lg font-semibold mt-4">Productos en tu pedido:</h3>
                            <ul className="space-y-3">
                                {orden.productos.map((prod) => (
                                    <li key={prod.id} className="flex items-center gap-4 border-b pb-2">
                                        {/* Mostrar imagen del producto */}
                                        <img src={prod.imgurl} alt={prod.nombre} width={80} className="rounded" />
                                        <div>
                                            <p><strong>{prod.nombre}</strong></p>
                                            {/* Mostrar cantidad, por defecto 1 si no existe */}
                                            <p>Cantidad: {prod.DetalleOrden?.cantidad || 1}</p>
                                            {/* Mostrar precio total, por defecto solo el precio si no hay cantidad */}
                                            <p>
                                                Precio Total: S/ {prod.DetalleOrden?.subtotal ? Number(prod.DetalleOrden.subtotal).toFixed(2) : "0.00"}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>No se encontró la orden.</p>
                    )}
                </div>
                {/* Botón para volver al menú principal */}
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
