import { createContext, useState, useEffect } from "react";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  loginUsuario,
  eliminarUsuario,
  desactivarUsuario,
  actualizarUsuario,
} from "@/data/usuarios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await obtenerUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const setUser = (user) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const agregarUsuario = async (usuario) => {
    try {
      const nuevoUsuario = await crearUsuario(usuario);
      setUsuarios([...usuarios, nuevoUsuario]);
      return nuevoUsuario;
    } catch (error) {
      console.error("Error al agregar usuarios:", error);
    }
  };

  const actualizarDatosUsuario = async (data, id) => {
    try {
      await actualizarUsuario(data, id);
    } catch (e) {
      console.error("Error al modificar usuario", e);
    }
  };
  const deactivateUser = async (id, data) => {
    try {
      await desactivarUsuario(id, data);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, ...data } : usuario
        )
      );
    } catch (error) {
      console.error("Error al agregar usuarios:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await eliminarUsuario(id);
      const actualizado = usuarios.filter((u) => u.id !== id);
      setUsuarios(actualizado);
    } catch (error) {
      console.error("Error al agregar usuarios:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const usuarioLogueado = await loginUsuario({ email, password });
      if (usuarioLogueado) {
        setUser(usuarioLogueado);
        return usuarioLogueado;
      } else {
        console.error("Credenciales incorrectas");
        return null;
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return null;
    }
  };

  const usuarioPorId = async (usuarioId) => {
    try {
      const usuario = await obtenerUsuarioPorId(usuarioId);
      return usuario;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuarios,
        user,
        setUser,
        logout,
        agregarUsuario,
        actualizarDatosUsuario,
        deactivateUser,
        deleteUser,
        login,
        usuarioPorId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
