import { Link } from "react-router-dom";
import styles from "../styles/Alumno3Styles";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export function UserRow({ usuario }) {
  const { deactivate } = useContext(AuthContext);
  const handleDeactivate = () => {
    if (usuario.admin) {
      alert("No puedes desactivar a un administrador");
      return;
    }
    deactivate(usuario.id);
  };
  return (
    <tr className={usuario.admin ? "text-blue-800" : ""}>
      <td>{usuario.nombre}</td>
      <td>{usuario.email}</td>
      <td>
        <Link
          to={`/userdetail/${usuario.id}`}
          className="text-blue-500 hover:font-bold"
        >
          Ver detalle
        </Link>
      </td>
      <td>
        <button onClick={handleDeactivate} className={styles.deactivatebutton}  >
          Desactivar
        </button>
      </td>
    </tr>
  );
}
