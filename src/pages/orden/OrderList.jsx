import { useContext, useState } from "react";
import { obtenerOrdenes } from "@/data/ordenes";
import { Title } from "@/components/Title";
import { AuthContext } from "@/context/AuthContext";
import { OrderTable } from "@/components/OrderTable";
import { Link } from "react-router-dom";

export const OrderList = () => {
  const ordenestotales = obtenerOrdenes();
  const [ordenes, setOrdenes] = useState(ordenestotales);
  const {usuarios} = useContext(AuthContext);

  const handleSearch = (e) => {
    const busqueda = e.target.value.toLowerCase();
    const usuario = usuarios.find((user)=>user.nombre.toLowerCase().includes(busqueda))
    const id = usuario ? usuario.id : null;
    const filtro = ordenestotales.filter(
      (orden) =>
        orden.id?.toString().includes(busqueda) || 
        orden.productos?.some((producto) =>
          producto.nombre?.toLowerCase().includes(busqueda) 
        )||
        orden.usuarioid === id 
        
    );
    setOrdenes(filtro);
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
