import React, { createContext, useContext, useState, useEffect } from "react";

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

  // Órdenes
  const [ordenes, setOrdenes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ordenes")) || [];
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem("envioGuardar", JSON.stringify(envios));
  }, [envios]);

  useEffect(() => {
    localStorage.setItem("ordenes", JSON.stringify(ordenes));
  }, [ordenes]);

  const guardarProducto = (producto) => {
    setProductos((prev) => [...prev, producto]);
  };

  const agregarOrden = (nuevaOrden) => {
    const nuevas = [...ordenes, nuevaOrden];
    setOrdenes(nuevas);
  };

  const eliminarOrden = (id) => {
    const actualizadas = ordenes.filter((orden) => orden.id !== id);
    setOrdenes(actualizadas);
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
