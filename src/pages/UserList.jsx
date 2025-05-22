import Footer from "../components/Footer";
import Header from "../components/Header";
import { Title } from "../components/Title";
import { UserRow } from "../components/UserRow";
import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";
import styles from "../styles/Alumno3Styles";

export function UserList() {
  const { usuarios } = useContext(AuthContext);
  console.log(usuarios);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <Title text="Lista de Usuarios" />

        <table className="text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className={styles.tableHeader}>Nombre</th>
              <th className={styles.tableHeader}>Email</th>
              <th className={styles.tableHeader}>Detalle</th>
            </tr>
          </thead>

          <tbody className="border-b-1 border-blue-600">
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="4">No hay usuarios registrados</td>
              </tr>
            ) : (
              usuarios.map((usuario) => <UserRow usuario={usuario} key={usuario.id} />)
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
}
