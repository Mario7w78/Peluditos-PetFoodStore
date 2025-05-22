import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Title } from "../components/Title";
export function UserDetail() {
  const { id } = useParams();

  const { usuarios } = useContext(AuthContext);
  const usuario = usuarios.find((user) => user.id === id);

  return (
    <>
      <Header />
      <Title text="Detalle del Usuario" />
      <div className="flex flex-col items-center ">
        <div className="flex justify-center gap-4 px-2 py-3 border border-blue-500 rounded-3xl w-[30%]">
          <div className="text-9xl">🧑‍💼</div>
          {usuario ? (
            <div className="text-left [&_strong]:text-blue-700">
              <p>
                <strong>Nombre:</strong> {usuario.nombre}
              </p>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
              <p>
                <strong>DNI:</strong>{" "}
                {usuario.dni ? usuario.dni : "No disponible"}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {usuario.age ? usuario.age : "No disponible"}
              </p>
              <p>
                <strong>Rol:</strong> {usuario.admin ? "Administrador" : "Usuario"}
              </p>
            </div>
          ) : (
            <p>No se encontró el usuario.</p>
          )}
        </div>
        <Link className="text-blue-700 hover:font-bold border my-3 rounded-2xl p-2 hover:border-2" to="/userlist">Volver a la lista de usuarios</Link>
      </div>
      <Footer />
    </>
  );
}
