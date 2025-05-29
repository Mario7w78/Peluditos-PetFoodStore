import styles from "../styles/Alumno3Styles";
import { OrderRow } from "../components/OrderRow";
export function OrderTable({ordenes}) {
    return (
        <>
            <table className="text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className={styles.tableHeader}>ID</th>
                  <th className={styles.tableHeader}>ID</th>
                  <th className={styles.tableHeader}>Fecha</th>
                  <th className={styles.tableHeader}>Productos</th>
                  <th className={styles.tableHeader}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.length > 0 ? (
                  ordenes.map((orden) => (
                    <OrderRow order = {orden} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No se encontraron órdenes.</td>
                  </tr>
                )}
              </tbody>
            </table>
        </>
      );
}
