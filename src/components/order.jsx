export const Order = ({ order }) => {
  return (
    <div className="border rounded-2xl p-4 w-[30%] border-blue-500 [&_strong]:text-blue-700">
      <p><strong>Order ID:</strong> </p>
      <p><strong>Date:</strong> </p>
      <p><strong>Total Amount:</strong> </p>
      <h3><strong>Productos:</strong></h3>
      <ul>
        <li>Producto 1</li>
        <li>Producto 2</li>
      </ul>
    </div>
  );
}