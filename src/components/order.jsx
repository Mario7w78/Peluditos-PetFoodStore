export const Order = ({ order }) => {
  return (
    <div className="border rounded-2xl p-4 w-[30%] border-blue-500 [&_strong]:text-blue-700 mb-4 flex flex-col gap-1">
      <p><strong>ID:</strong> {order.id} </p>
      <p><strong>Fecha:</strong> {order.fecha} </p>
      <p><strong>Monto Total:</strong> {order.total} </p>
      <h3><strong>Productos:</strong></h3>
      <ul className="list-disc pl-9">
        {order.productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - Cantidad: {producto.cantidad} - Precio: {producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}