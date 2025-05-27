import React, { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const ContextProvider = ({ children }) => {
    // Estado para los productos
    const [productos, setProductos] = useState(() => {
        try {
        return JSON.parse(localStorage.getItem("productos")) || [];
        } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
        }
    });

    // Estado para la información de envío
    const [envios, setEnvios] = useState(() => {
        try {
        return JSON.parse(localStorage.getItem("envioGuardar")) || [];
        } catch (error) {
        console.error("Error al obtener envíos:", error);
        return [];
        }
    });

    // Efecto para guardar productos en localStorage
    useEffect(() => {
        localStorage.setItem("productos", JSON.stringify(productos));
    }, [productos]);

    // Efecto para guardar envíos en localStorage
    useEffect(() => {
        localStorage.setItem("envioGuardar", JSON.stringify(envios));
    }, [envios]);

    // Función para agregar un producto
    const guardarProducto = (producto) => {
        setProductos((prev) => [...prev, producto]);
    }
};

export const useOrderContext = () => useContext(OrderContext);