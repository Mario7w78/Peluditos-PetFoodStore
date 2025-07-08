import { Title } from "@/components/Title";
import { OrderTable } from "@/components/OrderTable";
import { Link } from "react-router-dom";
import { useState } from "react";

export const OrderList = ({ordenes, usuarios}) => {
  const [filtro, setFiltro] = useState("");

  const ordenesFiltradas = ordenes.filter((orden) => {
    const filtroLower = filtro.toLowerCase();


    if (orden.id.toString().includes(filtroLower)) return true;

    const usuario = usuarios.find((u) =>
      u.nombre.toLowerCase().includes(filtroLower)
    );
    if (usuario && orden.usuarioId === usuario.id) return true;


    for (const producto of orden.productos) {
      if (producto.nombre.toLowerCase().includes(filtroLower)) return true;
    }

    return false; 
  });
  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <Title text="Lista de Órdenes" />
        <input
          onChange={(e)=>setFiltro(e.target.value)}
          type="text"
          placeholder="Buscar por ID de orden, usuario o producto"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <OrderTable ordenes={ordenesFiltradas} />
        <Link
            to="/dashboard"
            className="text-blue-700 hover:font-bold border my-3 rounded-2xl p-2 hover:border-2"
          >
            Volver al Dashboard
        </Link>
      </div>

      
    </>
  );
};
