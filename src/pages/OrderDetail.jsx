import React from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerOrdenes } from "../data/ordenes";
import { Title } from "../components/Title";

export const OrderDetail = () => {
  const { orderId } = useParams();
  const ordenes = obtenerOrdenes();
  const orden = ordenes.find((orden) => orden.id === orderId);

  return (
    <div className="flex flex-col items-center h-screen">
      <Title text="Detalle de la Orden" />
      {orden ? (
        <div className="border-2 border-blue-500 p-4 [&_strong]:text-blue-700 rounded-lg w-3/4">
          <p><strong>ID de Orden:</strong> {orden.id}</p>
          <p><strong>Fecha:</strong> {orden.fecha}</p>
          <p><strong>Nombre de Usuario:</strong> {orden.usuarioid}</p>
          <p><strong>Productos:</strong></p>
          <ul>
            {orden.productos.map((producto, index) => (
              <li key={index}>{producto.nombre} - Cantidad: {producto.cantidad} - Precio: {producto.precio}</li>
            ))}
          </ul>
        <p><strong>Total:</strong> ${orden.total}</p>
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
