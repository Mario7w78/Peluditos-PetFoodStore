import { Link } from "react-router-dom";
import { useContext } from "react";
import { OrderContext } from "@/context/orderContext";

export function OrderRow({ order, mostrarAcciones = true }) {
  const { cancelarOrdenPorId } = useContext(OrderContext);
  
  const handleEliminar = () => {
    if (window.confirm("¿Estás seguro de eliminar esta orden?")) {
      cancelarOrdenPorId(order.id);
    }
  };

  return (
    <tr className="p-3">
      <td>{order.id}</td>
      <td className="flex justify-center">{order.productos.map((p) =><img className="w-16" src={p.imgurl}/>)}</td>
      <td>{order.fecha.substr(0,10)}</td>
      <td>{order.estado}</td>
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

