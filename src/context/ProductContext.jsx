import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState(() => {
    return JSON.parse(localStorage.getItem("productos")) || [];
  });

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const addProducto = (producto) => {
    setProductos((prev) => [...prev, producto]);
  };

  return (
    <ProductContext.Provider value={{ productos, addProducto }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
