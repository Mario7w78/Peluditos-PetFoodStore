import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const addProducto = (producto) => {
    setProductos((prev) => [...prev, producto]);
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((producto) => producto.id !== id));
  };

  return (
    <ProductContext.Provider value={{ productos, setProductos, addProducto, eliminarProducto }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);