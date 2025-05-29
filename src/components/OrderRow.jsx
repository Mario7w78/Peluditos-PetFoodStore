import { Link } from "react-router-dom";
import styles from "../styles/Alumno3Styles";
export function OrderRow({ order }) {

  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.fecha}</td>
      <td>{order.productos.map((product)=>product.nombre+" ")}</td>
      <td><Link>Ver Detalle</Link></td>
    </tr>
  );
}
