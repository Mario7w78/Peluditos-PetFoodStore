import { createContext, useState, useEffect } from "react";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorNombre,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
  buscarProducto,
  eliminarProducto,
  modificarProducto
} from "@/data/productos";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productosBuscados, setProductosBuscados] = useState([])

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


  const buscarProductos = async (buscar) => {
    try {
      const productos = await buscarProducto(buscar);
      setProductosBuscados(productos);
    } catch (error) {
      console.error("Error al buscar producto:", error);
    }
  };
  const eliminarProductos = async (producto) => {
    try {
      await eliminarProducto(producto);
      const productosSinEliminar = productos.filter(p => p.id !== producto.id)
      setProductos(productosSinEliminar)
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };
  const modificarProductos = async (id, producto) => {
    try {
      const productoActualizado = await modificarProducto(id, producto);

      setProductos((prods) =>
        prods.map((p) =>
          p.id === producto.id ? { ...p, ...productoActualizado } : p
        )
      );
    } catch (error) {
      console.error("Error al modificar producto:", error);
    }
  };




  return (
    <ProductContext.Provider
      value={{ productos, agregarProducto, obtenerProductoPorId, buscarProductos, productosBuscados, eliminarProductos, modificarProductos, obtenerProductoPorNombre, obtenerProductosPorCategoria }}
    >
      {children}
    </ProductContext.Provider>
  );
};
