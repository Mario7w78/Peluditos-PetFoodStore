import { useState } from 'react';
import { obtenerOrdenes } from '../data/ordenes';
import { Order } from '../components/order';

export const OrderList = () => {
  const ordenestotales = obtenerOrdenes();
  const [ordenes, setOrdenes] = useState(ordenestotales); // Mostrar todas al inicio

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredOrders = ordenestotales.filter((orden) =>
      orden.productos.some((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm)
      )
    );
    setOrdenes(filteredOrders);
  };

  return (
    <>
      <input className='border' onChange={handleSearch} type="text" placeholder="Buscar producto..." />
      {ordenes.length > 0 ? (
        ordenes.map((order) => (
          <Order key={order.id} order={order} />
        ))
      ) : (
        <p>No se encontro las ordenes.</p>
      )}
    </>
  );
};