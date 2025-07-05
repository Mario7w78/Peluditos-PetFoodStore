import { useContext, useEffect, useState } from "react";
import { Title } from "@/components/Title";
import { AuthContext } from "@/context/AuthContext";
import { OrderTable } from "@/components/OrderTable";
import { API_URL } from "@/data/config";

export const OrderList = () => {
  const [ordenes, setOrdenes] = useState([]);
  const { usuarios } = useContext(AuthContext);

  // Obtener órdenes en tiempo real del backend
  useEffect(() => {
    fetch(`${API_URL}/orden`)
      .then((res) => res.json())
      .then((data) => setOrdenes(data));
  }, []);

  const handleSearch = (e) => {
    const busqueda = e.target.value.toLowerCase();
    const usuario = usuarios.find((user) =>
      user.nombre.toLowerCase().includes(busqueda)
    );
    const id = usuario ? usuario.id : null;
    setOrdenes((prev) =>
      prev.filter(
        (orden) =>
          orden.id?.toString().includes(busqueda) ||
          orden.productos?.some((producto) =>
            producto.nombre?.toLowerCase().includes(busqueda)
          ) ||
          orden.usuarioId === id
      )
    );
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
