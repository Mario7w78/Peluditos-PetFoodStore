import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user, actualizarUsuario } = useContext(AuthContext);

  const navigate = useNavigate();

  const [showChangeForm, setShowChangeForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  actualizarUsuario(updatedUser); // ✅ Usamos la función del contexto

  alert("Contraseña actualizada con éxito.");
  setNewPassword("");
  setConfirmPassword("");
  setShowChangeForm(false);
};

  const handleRegresar = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
          Perfil de Usuario
        </h2>
        <div className="space-y-4 text-gray-700 text-base">
          <p><strong>👤 Nombre:</strong> {user.nombre}</p>
          <p><strong>📧 Email:</strong> {user.email}</p>
          <p><strong>🆔 DNI:</strong> {user.dni}</p>
          <p><strong>🔐 Contraseña actual:</strong> {"*".repeat(user.password.length)}</p>
          <p><strong>🎂 Fecha de nacimiento:</strong> {user.age}</p>
          <p><strong>🎓 Rol:</strong> {user.rol || "Cliente"}</p>

          {/* Mostrar botón o formulario */}
          {!showChangeForm ? (
            <button
              onClick={() => setShowChangeForm(true)}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded mb-2"
            >
              Cambiar contraseña
            </button>
          ) : (
            <div className="space-y-3">
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
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              >
                Guardar contraseña
              </button>
              <button
                onClick={() => {
                  setShowChangeForm(false);
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded"
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
    </div>
  );
};

export default UserProfile;



