import { useContext, useState } from "react";
import { obtenerOrdenes } from "../data/ordenes";
import { Title } from "../components/Title";
import styles from "../styles/Alumno3Styles";
import { AuthContext } from "../context/AuthContext";

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
      <div className="flex flex-col items-center">
        <Title text="Lista de Órdenes" />
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Buscar por ID de orden, usuario o producto"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <table className="text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className={styles.tableHeader}>ID</th>
              <th className={styles.tableHeader}>Fecha</th>
              <th className={styles.tableHeader}>Número de Productos</th>
              <th className={styles.tableHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.length > 0 ? (
              ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td>{orden.id}</td>
                  <td>{orden.fecha}</td>
                  <td>{orden.productos.length}</td>
                  <td>
                    <button className="btn btn-primary">Ver Detalle</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No se encontraron órdenes.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
