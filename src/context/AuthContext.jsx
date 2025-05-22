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

  //desactivar usuario o eliminar usuario

  const deactivate = (id) => {
    const updatedUsuarios = usuarios.filter(usuario => usuario.id !== id);
    setUsuarios(updatedUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, deactivate, usuarios}}>
      {children}
    </AuthContext.Provider>
  );
};
