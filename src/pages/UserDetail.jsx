import { useParams } from "react-router-dom";
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
      <div>
        <Title text="Detalle del Usuario" />
        {usuario ? (
          <div className="text-center">
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
              <strong>Admin:</strong> {usuario.admin ? "Sí" : "No"}
            </p>
          </div>
        ) : (
          <p>No se encontró el usuario.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
