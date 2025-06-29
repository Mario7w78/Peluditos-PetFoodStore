import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

function UserTable({ limit = 5, usuarios}) {
  const navigate = useNavigate();
  const usuariosAMostrar = limit ? usuarios.slice(0, limit) : usuarios;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {usuariosAMostrar.map((usuario) => (
            <tr key={usuario.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{usuario.nombre}</td>
              <td className="px-4 py-2">{usuario.email}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => navigate(`/userdetail/${usuario.id}`)}
                  className="text-blue-500 hover:underline"
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
