import { Title } from "@/components/Title";
import { UserRow } from "@/components/UserRow";
import { Link } from "react-router-dom";
import styles from "@/styles/Alumno3Styles";
import { useEffect, useState } from "react";
import { API_URL } from "@/data/config";

export function UserList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/usuario`)
      .then((res) => res.json())
      .then((data) => setUsuarios(data || []));
  }, []);

  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <Title text="Lista de Usuarios" />
        <Link
          to="/dashboard"
          className="text-blue-700 hover:font-bold border my-3 rounded-2xl p-2 hover:border-2"
        >
          Volver al Dashboard
        </Link>
        <table className="text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className={styles.tableHeader}>Nombre</th>
              <th className={styles.tableHeader}>Email</th>
              <th className={styles.tableHeader}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="4">No hay usuarios registrados</td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <UserRow usuario={usuario} key={usuario.id} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
