import { Link } from "react-router-dom";

export function UserRow({ usuario}) {
  return (
    <tr>
      <td>{usuario.nombre}</td>
      <td>{usuario.email}</td>
      <td><Link to="/" className="text-blue-500 hover:font-bold" >Ver detalle</Link></td>
      
    </tr>
  );
}