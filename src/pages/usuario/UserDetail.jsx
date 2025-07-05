import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Title } from "@/components/Title";
import { OrderTable } from "@/components/OrderTable";
import { API_URL } from "@/data/config";

export function UserDetail() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await fetch(`${API_URL}/usuario/${id}`);
        const usuario = await resUser.json();
        const resOrdenes = await fetch(`${API_URL}/orden/${id}`);
        const ordenes = await resOrdenes.json();
        setUsuario(usuario);
        setOrdenes(ordenes);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Title text="Detalle del Usuario" />
      <div className="flex flex-col items-center ">
        <div className="flex justify-center gap-4 px-2 py-3 border border-blue-500 rounded-3xl ">
          <div className="text-9xl">🧑</div>
          {usuario ? (
            <div className="text-left [&_strong]:text-blue-700">
              <p>
                <strong>Nombre:</strong> {usuario.nombre}
              </p>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
              <p>
                <strong>DNI:</strong> {usuario.dni ? usuario.dni : "No disponible"}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong> {usuario.fechaNacimiento?.substr(0, 10)}
              </p>
              <p>
                <strong>Fecha de Registro:</strong> {usuario.fechaRegistro?.substr(0, 10)}
              </p>
              <p>
                <strong>Rol:</strong> {usuario.admin ? "Administrador" : "Usuario"}
              </p>
              <p>
                <strong>Estado:</strong> {usuario.canlogin ? "Activo" : "Inactivo"}
              </p>
            </div>
          ) : (
            <p>Cargando usuario...</p>
          )}
        </div>
        <div className="w-full max-w-2xl mt-6">
          <h3 className="text-lg font-semibold mb-2">Órdenes del usuario</h3>
          <OrderTable ordenes={ordenes} />
        </div>
        <Link to="/userlist" className="mt-4 text-blue-700 hover:underline">
          Volver a la lista de usuarios
        </Link>
      </div>
    </>
  );
}
