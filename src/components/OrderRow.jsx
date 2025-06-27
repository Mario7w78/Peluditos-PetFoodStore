import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useOrderContext } from "@/context/orderContext";

export function OrderRow({ order, mostrarAcciones = true }) {
  const { usuarios, user, admin } = useContext(AuthContext);
  const { eliminarOrden } = useOrderContext();

  const usuario = usuarios.find((u) => u.id === order.usuarioid);
  
  const handleEliminar = () => {
    if (window.confirm("¿Estás seguro de eliminar esta orden?")) {
      eliminarOrden(order.id);
    }
  };

  return (
    <tr className="p-3">
      <td>{order.id}</td>
      <td>{usuario?.nombre}</td>
      <td>{order.fecha}</td>
      <td>{order.productos.map((p) => p.nombre).join(", ")}</td>
      <td>
        {mostrarAcciones && (
          <>
            <Link
              className="text-blue-700 hover:font-bold"
              to={`/orderdetail/${order.id}`}
            >
              Ver Detalle
            </Link>
            <button
                onClick={handleEliminar}
                className="ml-2 text-red-600 hover:font-bold"
              >
                Cancelar
              </button>
            
          </>
        )}
      </td>
    </tr>
  );
}
export function OrderRowAdmin({ order }) {
  return <OrderRow order={order} mostrarAcciones={false} />;
}

