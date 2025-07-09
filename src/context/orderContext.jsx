import { createContext, useState, useEffect } from "react";
import {
  obtenerOrdenes,
  crearOrdenDesdeCarrito,
  obtenerOrdenesPorUsuario,
  obtenerOrdenesPorId,
  cancelarOrden,
} from "@/data/ordenes";

export const OrderContext = createContext();

export const ContextProvider = ({ children }) => {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenesDelUsuario, setOrdenesDelUsuario] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordenesData = await obtenerOrdenes();
        setOrdenes(ordenesData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  const cancelarOrdenPorId = async (id) => {
    try {
      await cancelarOrden(id);
      const actualizado = ordenes.filter((u) => u.id !== id);
      setOrdenes(actualizado);
    } catch (error) {
      console.error("Error al agregar usuarios:", error);
    }
  };

  const ordenesUsuario = async (usuarioId) => {
    try {
      const orden = await obtenerOrdenesPorUsuario(usuarioId);
      setOrdenesDelUsuario(orden);
      return orden;
    } catch (e) {
      console.error(e);
    }
  };

  const ordenesPorId = async (ordenId) => {
    try {
      const orden = await obtenerOrdenesPorId(ordenId);
      return orden;
    } catch (e) {
      console.error(e);
    }
  };

  const crearOrdenes = async (usuarioId) => {
    try {
      const ordenid = await crearOrdenDesdeCarrito(usuarioId);
      return ordenid;
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <OrderContext.Provider
      value={{
        ordenes,
        ordenesDelUsuario,
        cancelarOrdenPorId,
        ordenesUsuario,
        ordenesPorId,
        crearOrdenes,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
