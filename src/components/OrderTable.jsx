import styles from "../styles/Alumno3Styles";
import { OrderRow } from "../components/OrderRow";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function OrderTable({ ordenes, mostrarAcciones = true }) {

  return (
    <table className="w-full text-center border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className={styles.tableHeader}>ID</th>
          <th className={styles.tableHeader}>Usuario</th>
          <th className={styles.tableHeader}>Fecha</th>
          <th className={styles.tableHeader}>Productos</th>
          <th className={styles.tableHeader}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ordenes.length > 0 ? (
          ordenes.map((orden) => (
            <OrderRow key={orden.id} order={orden} />
          ))
        ) : (
          <tr>
            <td colSpan="5" className="py-4 text-gray-500">
              No se encontraron órdenes.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
