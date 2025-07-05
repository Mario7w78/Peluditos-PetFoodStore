import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Title } from "@/components/Title";
import styles from "@/styles/Alumno3Styles";
import { useOrderContext } from "@/context/orderContext";
import { API_URL } from "@/data/config";

export const OrderDetail = () => {
  const { orderId } = useParams();
  const { eliminarOrden } = useOrderContext();
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/orden/detalle/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrden(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderId]);

  const handleEliminar = () => {
    if (window.confirm("¿Estás seguro de eliminar esta orden?")) {
      eliminarOrden(orden.id);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Cargando...</p>
    );

  return (
    <div className="flex flex-col items-center h-screen">
      <Title text="Detalle de la Orden" />
      {orden ? (
        <div className="border-2 border-blue-500 p-4 [&_strong]:text-blue-700 rounded-lg w-3/4">
          <p>
            <strong>ID de Orden:</strong> {orden.id}
          </p>
          <p>
            <strong>Fecha:</strong> {orden.fecha}
          </p>
          <p>
            <strong>Usuario:</strong> {orden.usuarioId || orden.usuarioid}
          </p>
          <p>
            <strong>Productos:</strong>
          </p>
          <ul>
            {orden.productos.map((producto, index) => (
              <li key={index}>
                {producto.nombre} - Cantidad:{" "}
                {producto.DetalleOrden?.cantidad || producto.cantidad} - Precio:{" "}
                {producto.DetalleOrden?.precioUnitario || producto.precioUnitario}
              </li>
            ))}
          </ul>
          {/* Si tienes el total, muéstralo aquí */}
          <button
            onClick={handleEliminar}
            className={styles.button + " my-2"}
          >
            Cancelar orden
          </button>
        </div>
      ) : (
        <p>No se encontró la orden.</p>
      )}
      <Link
        className="text-blue-700 hover:font-bold border my-3 rounded-2xl p-2 hover:border-2"
        to="/totalorderlist"
      >
        Volver a la lista de ordenes
      </Link>
    </div>
  );
};
