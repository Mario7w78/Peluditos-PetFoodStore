// El OrderContext lo utilizamos para obtener la informacion de la informacion del envio y los productos
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
    // Estado para los productos
    const [productos, setProductos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("productos")) || [];
        }
        catch (error) {
            console.error("Error al obtener productos:", error);
            return [];
        }
    });

    // Estado para la información de envío
    const [envios, setEnvios] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("envioGuardar")) || [];
        }
        catch (error) {
            console.error("Error al obtener envíos:", error);
            return [];
        }
    });
    
    return (
        <OrderContext.Provider value={{ datosEnvio, setDatosEnvio, productos, actualizarProductos }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => useContext(OrderContext);
