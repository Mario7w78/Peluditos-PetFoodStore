import { useContext, useState } from "react";
import { obtenerOrdenes } from "../data/ordenes";
import { Title } from "../components/Title";
import { AuthContext } from "../context/AuthContext";
import { OrderTable } from "../components/OrderTable";

export const OrderList = () => {
  const ordenestotales = obtenerOrdenes();
  const [ordenes, setOrdenes] = useState(ordenestotales);
  const {usuarios} = useContext(AuthContext);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredOrders = ordenestotales.filter(
      (orden) =>
        orden.id?.toString().includes(searchTerm) || 
        orden.productos?.some((producto) =>
          producto.nombre?.toLowerCase().includes(searchTerm) 
        )
    );
    setOrdenes(filteredOrders);
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <Title text="Lista de Órdenes" />
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Buscar por ID de orden, usuario o producto"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <OrderTable ordenes={ordenes} />
      </div>

      
    </>
  );
};
