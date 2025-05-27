import { createContext, useState, useEffect } from 'react';
import { guardarUsuario, obtenerUsuarios } from '../data/usuarios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });


  const [usuarios, setUsuarios] = useState(obtenerUsuarios());

  const login = (email, password) => {
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      setUser(usuario);
      localStorage.setItem('user', JSON.stringify(usuario));
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

  const deactivate = (id) => {
    const updatedUsuarios = usuarios.filter(usuario => usuario.id !== id);
    setUsuarios(updatedUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

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
        actualizarUsuario, // <-- nuevo método
        deactivate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
