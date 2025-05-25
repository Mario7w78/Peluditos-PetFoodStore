// CategoriesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("categorias")) || [];
    setCategorias(guardadas);
  }, []);

  const addCategoria = (nuevaCategoria) => {
    const nuevas = [...categorias, nuevaCategoria];
    setCategorias(nuevas);
    localStorage.setItem("categorias", JSON.stringify(nuevas));
  };

  return (
    <CategoriesContext.Provider value={{ categorias, addCategoria }}>
      {children}
    </CategoriesContext.Provider>
  );
};

// Hook personalizado
export const useCategoriesStore = () => useContext(CategoriesContext);
