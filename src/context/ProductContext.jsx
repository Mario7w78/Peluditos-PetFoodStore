/*
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

  const eliminarProductos = (id, setProductos) => {
    const productos = JSON.parse(localStorage.getItem("productos")) || []; // Obtener productos actuales
    const productosFiltrados = productos.filter(prod => prod.id !== id); // Filtrar los productos y excluir el que coincide con el id

    localStorage.setItem("productos", JSON.stringify(productosFiltrados)); // Actualizar localStorage con los productos restantes
    setProductos(productosFiltrados);
  };

  return (
    <ProductContext.Provider value={{ productos, setProductos, addProducto, eliminarProductos }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
*/

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

  // ✅ Agregar la función eliminarProducto para que el estado se actualice correctamente
  /*
  const eliminarProducto = (id) => {
    const productosFiltrados = productos.filter(prod => prod.id !== id);
    setProductos(productosFiltrados);
    localStorage.setItem("productos", JSON.stringify(productosFiltrados));
  };
  */
  const eliminarProducto = (id) => {
    const productosFiltrados = productos.filter(prod => prod.id !== id); // ✅ Excluye solo el producto con ese ID
    setProductos(productosFiltrados); // ✅ Actualiza el estado correctamente
    localStorage.setItem("productos", JSON.stringify(productosFiltrados)); // ✅ Guarda la lista actualizada en localStorage
  };

  return (
    <ProductContext.Provider value={{ productos, setProductos, addProducto, eliminarProducto }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
