// CategoriesContext.jsx
import { createContext, useEffect, useState } from "react";
import { obtenerCategorias, crearCategoria } from "@/data/categorias";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasData = await obtenerCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

   const agregarCategoria = async (categoria) => {
      try {
        const nuevaCategoria = await crearCategoria(categoria);
        setCategorias([...categorias, nuevaCategoria]);
      } catch (error) {
        console.error("Error al agregar producto:", error);
      }
    };
  

  return (
    <CategoriesContext.Provider value={{ categorias, agregarCategoria}}>
          {children}
    </CategoriesContext.Provider>
  );
};

