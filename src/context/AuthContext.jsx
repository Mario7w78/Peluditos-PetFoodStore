import React, { createContext, useState } from "react";
import { guardarUsuario, obtenerUsuarios } from "../data/usuarios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [usuarios, setUsuarios] = useState(obtenerUsuarios());

  const login = (email, password) => {
    const usuario = usuarios.find(
      (u) => u.email === email && u.password === password
    );
    if (usuario && usuario.canlogin) {
      setUser(usuario);
      localStorage.setItem("user", JSON.stringify(usuario));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = (nuevoUsuario) => {
    if (usuarios.some((u) => u.email === nuevoUsuario.email)) {
      return { success: false, message: "El correo ya está registrado" };
    }
    guardarUsuario(nuevoUsuario);
    setUsuarios(obtenerUsuarios());
    return { success: true };
  };

  const actualizarUsuario = (usuarioActualizado) => {
    const nuevosUsuarios = usuarios.map((u) =>
      u.id === usuarioActualizado.id ? usuarioActualizado : u
    );
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    setUsuarios(nuevosUsuarios);
    setUser(usuarioActualizado);
    localStorage.setItem("user", JSON.stringify(usuarioActualizado));
  };

  const deleteuser = (id) => {
    const updatedUsuarios = usuarios.filter((usuario) => usuario.id !== id);
    setUsuarios(updatedUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(updatedUsuarios));
  };

  const deactivate = (id) => {
    const updatedUsuarios = usuarios.map((usuario) =>
      usuario.id === id ? { ...usuario, canlogin: !usuario.canlogin } : usuario
    );

    setUsuarios(updatedUsuarios);
    console.log("Usuarios actualizados:", updatedUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(updatedUsuarios));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        usuarios,
        setUsuarios,
        login,
        logout,
        register,
        actualizarUsuario,
        deactivate,
        deleteuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
