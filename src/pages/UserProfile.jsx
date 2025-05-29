import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p className="p-6 text-center">No has iniciado sesión.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Mi Perfil
        </h2>

        <div className="space-y-6 text-gray-700 text-base">
          <div className="text-center border-b pb-3">
            <p className="font-semibold flex justify-center items-center gap-2 mb-1">
              <span></span> Nombre
            </p>
            <p>{user.nombre}</p>
          </div>

          <div className="text-center border-b pb-3">
            <p className="font-semibold flex justify-center items-center gap-2 mb-1">
              <span></span> Email
            </p>
            <p>{user.email}</p>
          </div>

          <div className="text-center border-b pb-3">
            <p className="font-semibold flex justify-center items-center gap-2 mb-1">
              <span></span> DNI
            </p>
            <p>{user.dni}</p>
          </div>

          <div className="text-center">
            <p className="font-semibold flex justify-center items-center gap-2 mb-1">
              <span></span> Fecha de nacimiento
            </p>
            <p>{user.age}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
