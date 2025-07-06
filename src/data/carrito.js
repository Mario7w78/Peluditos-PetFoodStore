import { API_URL } from './config.js';

export async function crearCarrito(usuarioId) {
    const res = await fetch(`${API_URL}/carrito/crear/${usuarioId}`, {
      method: 'POST'
    });
    return res.json();
  }
  
  export async function obtenerCarritos() {
    const res = await fetch(`${API_URL}/carrito`);
    return res.json();
  }
  
  export async function obtenerCarritoPorUsuario(usuarioId) {
    const res = await fetch(`${API_URL}/carrito/usuario/${usuarioId}`);
    return res.json();
  }
  
  export async function eliminarProductoDelCarrito(carritoId, productoId) {
    const res = await fetch(`${API_URL}/carrito/${carritoId}/producto/${productoId}`, {
      method: 'DELETE'
    });
    return res.json();
  }
  
  export async function agregarProductoACarrito(carritoId, { productoId, cantidad, precioUnitario }) {
    const res = await fetch(`${API_URL}/carrito/${carritoId}/producto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productoId, cantidad, precioUnitario })
    });
    return res.text();
  }
  