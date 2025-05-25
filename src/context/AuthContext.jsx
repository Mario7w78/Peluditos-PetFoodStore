import React, { createContext, useState } from 'react';
import { guardarUsuario, obtenerUsuarios } from '../data/usuarios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usuarios, setUsuarios] = useState(obtenerUsuarios());

  const login = (email, password) => {
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      setUser(usuario);
      return true;
    }
    return false;
  };

  const register = (nuevoUsuario) => {
    if (usuarios.some(u => u.email === nuevoUsuario.email)) {
      return { success: false, message: 'El correo ya está registrado' };
    }
    guardarUsuario(nuevoUsuario);
    setUsuarios(obtenerUsuarios()); // Refrescar la lista de usuarios
    return { success: true };
  };

  const actualizarUsuario = (usuarioActualizado) => {
    const nuevosUsuarios = usuarios.map(u =>
      u.id === usuarioActualizado.id ? usuarioActualizado : u
    );
    localStorage.setItem("usuariosRegistrados", JSON.stringify(nuevosUsuarios));
    setUsuarios(nuevosUsuarios);
    setUser(usuarioActualizado);
  };

  const logout = () => setUser(null);

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
        actualizarUsuario // <-- nuevo método
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
