import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { OrderTable } from "@/components/OrderTable";
import Pagination from "@/components/Pagination";
import { OrderContext } from "../../context/orderContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { ordenes } = useContext(OrderContext);
  const navigate = useNavigate();

  const [showChangeForm, setShowChangeForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordenesFiltradas, setOrdenesFiltradas] = useState([]);
  const ordenesPorPagina = 10;

  useEffect(() => {
    const propias = ordenes.filter((o) => o.usuarioid === user.id);

    const filtradas = propias.filter((o) =>
      o.id.toLowerCase().includes(search.toLowerCase())
    );

    setOrdenesFiltradas(filtradas);
    setCurrentPage(1);
  }, [search, user]);

  if (!user) {
    return <p className="text-center mt-8">No has iniciado sesión.</p>;
  }

  const handlePasswordChange = () => {
    if (newPassword.trim().length < 4) {
      alert("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    actualizarUsuario(updatedUser);
    alert("Contraseña actualizada con éxito.");
    setNewPassword("");
    setConfirmPassword("");
    setShowChangeForm(false);
  };

  const handleRegresar = () => {
    navigate("/");
  };

  // Paginación
  const indexInicio = (currentPage - 1) * ordenesPorPagina;
  const ordenesPagina = ordenesFiltradas.slice(indexInicio, indexInicio + ordenesPorPagina);
  const totalPaginas = Math.ceil(ordenesFiltradas.length / ordenesPorPagina);

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">

      {/* Grid con bloque de perfil y bloque de contador */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        {/* Bloque de perfil */}
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">👤 Perfil de Usuario</h2>
          <div className="space-y-3 text-gray-700 text-base w-full">
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>DNI:</strong> {user.dni}</p>
            <p><strong>Contraseña:</strong> {"*".repeat(user.password.length)}</p>
            <p><strong>Fecha de nacimiento:</strong> {user.age}</p>
            <p><strong>Dirección:</strong> {user.direccion || "No especificada"}</p>
            <p><strong>Ciudad:</strong> {user.ciudad || "No especificada"}</p>
            <p><strong>Departamento:</strong> {user.departamento || "No especificado"}</p>
            <p><strong>Teléfono:</strong> {user.telefono || "No especificado"}</p>
            <p><strong>Rol:</strong> {user.rol || "Cliente"}</p>

            {!showChangeForm ? (
              <button
                onClick={() => setShowChangeForm(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded w-full"
              >
                Cambiar contraseña
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Confirmar nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
                <button
                  onClick={handlePasswordChange}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Guardar contraseña
                </button>
                <button
                  onClick={() => {
                    setShowChangeForm(false);
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            )}

            <button
              onClick={handleRegresar}
              className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
            >
              Regresar
            </button>
          </div>
        </div>

        {/* Bloque de contador de órdenes */}
        <div className="flex-1 bg-orange-500 text-white rounded-xl p-6 shadow-md flex flex-col items-center justify-center text-lg">
          <span className="text-6xl font-bold">{ordenesFiltradas.length}</span>
          <p className="mt-2 text-xl font-medium">Órdenes realizadas</p>
        </div>
      </div>

      {/* Bloque de tabla de órdenes */}
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">🧾 Tus Órdenes</h3>
        <input
          type="text"
          placeholder="Buscar por ID de orden..."
          className="w-full border px-3 py-2 rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <OrderTable ordenes={ordenesPagina} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPaginas}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UserProfile;
