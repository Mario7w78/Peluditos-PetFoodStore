import { Link } from "react-router-dom";
export const Order = ({ order }) => {
  return (
    <div className="border rounded-2xl p-4 w-[30%] border-blue-500 [&_strong]:text-blue-700 mb-4 flex flex-col gap-1">
      <p>
        <strong>Fecha:</strong> {order.fecha}{" "}
      </p>
      <h3>
        <strong>Productos:</strong>
      </h3>
      <ul className="list-disc pl-9">
        {order.productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - Cantidad: {producto.cantidad} - Precio:{" "}
            {producto.precio}
          </li>
        ))}
      </ul>
      <Link className="hover:font-bold hover:text-blue-700">Ver detalle</Link>
    </div>
  );
};
