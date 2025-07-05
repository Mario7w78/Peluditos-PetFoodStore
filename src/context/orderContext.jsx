import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "@/data/config";

const OrderContext = createContext();

export const ContextProvider = ({ children }) => {
  const [productos, setProductos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("productos")) || [];
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return [];
    }
  });

  const [envios, setEnvios] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("envioGuardar")) || [];
    } catch (error) {
      console.error("Error al obtener envíos:", error);
      return [];
    }
  });

  const [ordenes, setOrdenes] = useState([]);

  // Obtener órdenes del backend al montar
  useEffect(() => {
    fetch(`${API_URL}/orden`)
      .then((res) => res.json())
      .then((data) => setOrdenes(data || []))
      .catch(() => setOrdenes([]));
  }, []);

  // Métodos para agregar y eliminar órdenes en el backend
  const agregarOrden = async (nuevaOrden) => {
    const res = await fetch(
      `${API_URL}/orden/desde-carrito/${nuevaOrden.usuarioId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaOrden),
      }
    );
    if (res.ok) {
      const ordenCreada = await res.json();
      setOrdenes((prev) => [...prev, ordenCreada]);
    }
  };

  const eliminarOrden = async (id) => {
    await fetch(`${API_URL}/orden/${id}`, { method: "DELETE" });
    setOrdenes((prev) => prev.filter((orden) => orden.id !== id));
  };

  // Métodos locales para productos y envíos (puedes adaptarlos si tienes endpoints)
  const guardarProducto = (producto) => {
    setProductos((prev) => [...prev, producto]);
  };

  return (
    <OrderContext.Provider
      value={{
        productos,
        guardarProducto,
        envios,
        setEnvios,
        ordenes,
        setOrdenes,
        agregarOrden,
        eliminarOrden,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useOrderContext = () => useContext(OrderContext);
