import { Title } from "@/components/Title";
import { OrderTable } from "@/components/OrderTable";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { OrderContext } from "@/context/OrderContext";

export const OrderList = () => {
  const [filtro, setFiltro] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { buscarOrdenes, ordenesBuscados, ordenes } = useContext(OrderContext);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (filtro.trim() === "") return;
      try {
        setLoading(true);
        setError("");
        await buscarOrdenes(filtro);
      } catch (err) {
        setError("Ocurrió un error al buscar las órdenes.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Mostrar todas las órdenes si no hay filtro
  const ordenesAMostrar = filtro.trim() === "" ? ordenes : ordenesBuscados;

  return (
    <div className="flex flex-col items-center h-screen">
      <Title text="Lista de Órdenes" />
      <input
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Buscar por ID de orden, usuario o producto"
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      {loading && <p className="text-gray-500">Buscando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <OrderTable ordenes={ordenesAMostrar} />
      <Link
        to="/dashboard"
        className="text-blue-700 hover:font-bold border my-3 rounded-2xl p-2 hover:border-2"
      >
        Volver al Dashboard
      </Link>
    </div>
  );
};
