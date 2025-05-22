import { Link } from "react-router-dom";

export function UserRow({usuario}) {
  return (
    <tr className={usuario.admin ? "text-blue-800" : "" + " border-b-1 border-blue-600"}>
      <td>{usuario.nombre}</td>
      <td>{usuario.email}</td>
      <td><Link to={`/userdetail/${usuario.id}`} className="text-blue-500 hover:font-bold" >Ver detalle</Link></td>
      
    </tr>
  );
}