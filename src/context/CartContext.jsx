import { createContext, useState, useEffect } from "react";
import {
  obtenerCarritoPorUsuario,
  eliminarProductoDelCarrito,
  obtenerDetalleCarrito,
  actualizarCantidad,
  agregarProductoACarrito,
} from "@/data/carrito.js";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const carritoPorUsuario = async (usuarioId) => {
    try {
      const carrito = await obtenerCarritoPorUsuario(usuarioId);
      return carrito;
    } catch (e) {
      console.error(e);
    }
  };

  const obtenerDetalleCarritoporId = async (carritoId) => {
    try {
      const detalle = await obtenerDetalleCarrito(carritoId);
      return detalle;
    } catch (e) {
      console.error(e);
    }
  };

  const AgregarAlCarrito = async (producto, userId) => {
    try {
      const carrito = await carritoPorUsuario(userId);
      await agregarProductoACarrito(carrito.id, {
        productoId: producto.id,
        cantidad: 1,
        precioUnitario: producto.precioUnitario,
      });
      alert("Producto agregado al carrito");
    } catch (error) {
      alert("Error al agregar el producto al carrito");
    }
  };

  return (
    <CartContext.Provider
      value={{
        AgregarAlCarrito,
        obtenerDetalleCarritoporId,
        carritoPorUsuario,
        eliminarProductoDelCarrito,
        actualizarCantidad
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
