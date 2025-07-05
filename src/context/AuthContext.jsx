import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        // actualizarUsuario,
        // deactivate,
        // deleteuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
