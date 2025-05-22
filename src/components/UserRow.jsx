import { Link } from "react-router-dom";

export function UserRow({ usuario}) {
  return (
    <tr className={usuario.admin ? "bg-blue-200" : ""}>
      <td>{usuario.nombre}</td>
      <td>{usuario.email}</td>
      <td><Link to={`/userdetail/${usuario.id}`} className="text-blue-500 hover:font-bold" >Ver detalle</Link></td>
      
    </tr>
  );
}