import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

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
