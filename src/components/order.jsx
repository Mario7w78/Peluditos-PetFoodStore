export const Order = ({ order }) => {
  return (
    <div className="border rounded-2xl p-4 w-[30%] border-blue-500 [&_strong]:text-blue-700">
      <p><strong>Order ID:</strong>{order.id} </p>
      <p><strong>Date:</strong>{order.fecha} </p>
      <p><strong>Total Amount:</strong>{order.total} </p>
      <h3><strong>Productos:</strong></h3>
      <ul>
        {order.productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - Cantidad: {producto.cantidad} - Precio: {producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}