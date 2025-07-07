import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const PedidoCompleto = ({ ordenesPorId }) => {
    const [ordenes, setOrdenes] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordenes = await ordenesPorId(id);
                setOrdenes(ordenes)
                console.log(ordenes)
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData();
    }, []);


    const fechaEntrega = new Date();
    fechaEntrega.setDate(fechaEntrega.getDate() + 3); // Simulación de entrega en 3 días

    return (
        <div className="min-h-screen flex flex-col">

            <main className="flex-grow p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Pedido Completado</h1>
                <p className="text-lg mb-4">¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.</p>

                <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Detalles del Pedido</h2>
                    <p><strong>Número de Pedido:</strong> #{ordenes.id}</p>
                    <p><strong>Fecha Estimada de Entrega:</strong> {fechaEntrega.toLocaleDateString()}</p>

                    <h3 className="text-lg font-semibold mt-4">Productos en tu pedido:</h3>
                    <ul className="space-y-3">
                        {ordenes.productos?.map((prod) => (
                            <li key={prod.id} className="flex items-center gap-4 border-b pb-2">
                                {/* Mostrar imagen del producto */}
                                <img src={prod.imgurl} alt={prod.nombre} width={80} className="rounded" />
                                <div>
                                    <p><strong>{prod.nombre}</strong></p>
                                    {/* Mostrar cantidad, por defecto 1 si no existe */}
                                    <p>Cantidad: {prod.DetalleOrden.cantidad}</p>
                                    {/* Mostrar precio total, por defecto solo el precio si no hay cantidad */}
                                    <p>
                                        Precio Total: $
                                        {prod.DetalleOrden.subtotal}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
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
