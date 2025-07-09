import { createContext, useState, useEffect } from "react";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorNombre,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
} from "@/data/productos";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosData = await obtenerProductos();
        setProductos(productosData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  const agregarProducto = async (producto) => {
    try {
      const nuevoProducto = await crearProducto(producto);
      setProductos([...productos, nuevoProducto]);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{ productos, agregarProducto, obtenerProductoPorId }}
    >
      {children}
    </ProductContext.Provider>
  );
};
