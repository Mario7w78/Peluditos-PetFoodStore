// CategoriesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "@/data/config";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  // Obtener categorías del backend al montar
  useEffect(() => {
    fetch(`${API_URL}/categoria`)
      .then((res) => res.json())
      .then((data) => setCategorias(data || []))
      .catch(() => setCategorias([]));
  }, []);

  // Agregar categoría al backend y actualizar estado
  const addCategoria = async (nuevaCategoria) => {
    const res = await fetch(`${API_URL}/categoria`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaCategoria),
    });
    if (res.ok) {
      const creada = await res.json();
      setCategorias((prev) => [...prev, creada]);
    }
  };

  return (
    <CategoriesContext.Provider value={{ categorias, addCategoria }}>
      {children}
    </CategoriesContext.Provider>
  );
};

// Hook personalizado
export const useCategoriesStore = () => useContext(CategoriesContext);
