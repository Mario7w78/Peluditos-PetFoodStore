import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useOrderContext } from "../context/orderContext";

export function OrderRow({ order }) {
  const { usuarios, user } = useContext(AuthContext);
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
        <Link
          className="text-blue-700 hover:font-bold"
          to={`/orderdetail/${order.id}`}
        >
          Ver Detalle
        </Link>
      </td>
      <td>
        {/* Solo muestra el botón si el usuario actual es dueño de la orden */}
        {user.id === order.usuarioid && (
          <button
            onClick={handleEliminar}
            className="text-red-600 hover:font-bold"
          >
            Eliminar
          </button>
        )}
      </td>
    </tr>
  );
}
