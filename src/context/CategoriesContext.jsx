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

  const removeCategoria = (nombreCategoria) => {
    const filtradas = categorias.filter(cat => cat.nombre !== nombreCategoria);
    setCategorias(filtradas);
    localStorage.setItem("categorias", JSON.stringify(filtradas));
  };

  return (
    <CategoriesContext.Provider value={{ categorias, addCategoria, removeCategoria }}>
      {children}
    </CategoriesContext.Provider>
  );
};

// Hook personalizado
export const useCategoriesStore = () => useContext(CategoriesContext);

