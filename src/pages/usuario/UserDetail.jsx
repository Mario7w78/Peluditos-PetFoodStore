import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Title } from "@/components/Title";
import { OrderTable } from "@/components/OrderTable";
import { AuthContext } from "@/context/AuthContext";

export function UserDetail({ ordenesUsuario }) {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]);
  const {usuarioPorId} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuario = await usuarioPorId(id);
        const ordenes = await ordenesUsuario(id);

        setUsuario(usuario);
        setOrdenes(ordenes);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log(usuario);
  console.log(ordenes);
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
                <strong>Nombres Completos</strong> {usuario.nombresCompletos}
              </p>
              <p>
                <strong>Apellidos Completos</strong> {usuario.apellidosCompletos}
              </p>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
              <p>
                <strong>N° Telefono</strong> {usuario.telefono}
              </p>
              <p>
                <strong>Departamento</strong> {usuario.direccion}
              </p>
              <p>
                <strong>Direccion</strong> {usuario.direccion}
              </p>
              <p>
                <strong>DNI:</strong>{" "}
                {usuario.dni ? usuario.dni : "No disponible"}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {usuario.fechaNacimiento.substr(0, 10)}
              </p>
              <p>
                <strong>Fecha de Registro:</strong>{" "}
                {usuario.fechaRegistro.substr(0, 10)}
              </p>
              <p>
                <strong>Rol:</strong>{" "}
                {usuario.admin ? "Administrador" : "Usuario"}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                {usuario.canlogin ? "Activo" : "Desactivado"}
              </p>
            </div>
          ) : (
            <p>No se encontró el usuario.</p>
          )}
        </div>
        <Link
          className="text-blue-700 hover:font-bold border my-3 rounded-2xl p-2 hover:border-2"
          to="/userlist"
        >
          Volver a la lista de usuarios
        </Link>
      </div>
      <div className="flex flex-col items-center mt-6 h-screen">
        <Title text="Ordenes:" />

        <OrderTable ordenes={ordenes} usuario={usuario}/>
      </div>
    </>
  );
}
