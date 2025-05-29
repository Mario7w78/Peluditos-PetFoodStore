import { Link } from "react-router-dom";
import styles from "../styles/Alumno3Styles";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export function OrderRow({ order }) {
  const { usuarios } = useContext(AuthContext);
  const usuario = usuarios.find((user)=>user.id === order.usuarioid);

  return (
    <tr>
      <td>{order.id}</td>
      <td>{usuario.nombre}</td>
      <td>{order.fecha}</td>
      <td>{order.productos.map((product) => product.nombre + " ")}</td>
      <td>
        <Link>Ver Detalle</Link>
      </td>
    </tr>
  );
}
