export function UserRow({ usuario}) {
  return (
    <tr>
      <td>{usuario.nombre}</td>
      <td>{usuario.email}</td>
      <td>{usuario.dni}</td>
      <td>{usuario.age}</td>
    </tr>
  );
}