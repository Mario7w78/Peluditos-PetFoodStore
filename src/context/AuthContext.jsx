import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "@/data/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [usuarios, setUsuarios] = useState([]);

  // Obtener usuarios del backend
  useEffect(() => {
    fetch(`${API_URL}/usuario`)
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch(() => setUsuarios([]));
  }, []);

  // Login usando el backend
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/usuario/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const usuario = await res.json();
      if (usuario && usuario.canlogin) {
        setUser(usuario);
        localStorage.setItem("user", JSON.stringify(usuario));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Desactivar usuario
  const deactivate = async (id) => {
    await fetch(`${API_URL}/usuario/${id}/desactivar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ canlogin: false }),
    });
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, canlogin: false } : u))
    );
  };

  // Eliminar usuario
  const deleteuser = async (id) => {
    await fetch(`${API_URL}/usuario/${id}`, { method: "DELETE" });
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        usuarios,
        deactivate,
        deleteuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
