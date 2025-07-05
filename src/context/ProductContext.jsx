import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "@/data/config";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  // Obtener productos del backend al montar el componente
  useEffect(() => {
    fetch(`${API_URL}/producto`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => setProductos([]));
  }, []);

  // Guardar productos en localStorage si lo deseas (opcional)
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const addProducto = (producto) => {
    setProductos((prev) => [...prev, producto]);
  };

  const eliminarProducto = (id) => {
    // Elimina en backend y luego en frontend
    fetch(`${API_URL}/producto/${id}`, { method: "DELETE" })
      .then(() => setProductos((prev) => prev.filter((p) => p.id !== id)));
  };

  return (
    <ProductContext.Provider value={{ productos, addProducto, eliminarProducto }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
