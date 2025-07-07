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

  //Eliminar producto por id
  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((producto) => producto.id !== id));
  };

  return (
    <ProductContext.Provider value={{ productos, addProducto, eliminarProducto, setProductos }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
