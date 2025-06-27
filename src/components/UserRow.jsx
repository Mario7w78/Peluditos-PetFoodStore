import { useNavigate } from "react-router-dom";
import styles from "@/styles/Alumno3Styles";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export function UserRow({ usuario }) {
  const { deactivate, deleteuser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeactivate = () => {
    if (usuario.admin) {
      alert("No puedes desactivar a un administrador");
      return;
    }
    deactivate(usuario.id);
  };

  const handleDelete = () => {
    if (usuario.admin) {
      alert("No puedes eliminar a un administrador");
      return;
    }
    deleteuser(usuario.id);
  };

  return (
    <tr className={usuario.admin ? "text-blue-800" : ""}>
      <td>{usuario.nombre}</td>
      <td>{usuario.email}</td>
      <td>
        <button
          onClick={() => navigate(`/userdetail/${usuario.id}`)}
          className={styles.deactivatebutton}
        >
          Ver Detalle
        </button>
        <button onClick={handleDelete} className={styles.deactivatebutton}>
          Eliminar
        </button>
        <button
          onClick={handleDeactivate}
          className={`${styles.deactivatebutton} ${
            usuario.canlogin ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
          }`}
        >
          {usuario.canlogin ? "Activo" : "Desactivado"}
        </button>
      </td>
    </tr>
  );
}
