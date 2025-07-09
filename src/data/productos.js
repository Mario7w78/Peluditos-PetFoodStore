import { API_URL } from './config.js';

export async function crearProducto(data) {
  const res = await fetch(`${API_URL}/producto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function obtenerProductos() {
  const res = await fetch(`${API_URL}/producto`);
  return res.json();
}

export async function obtenerProductoPorId(id) {
  const res = await fetch(`${API_URL}/producto/${id}`);
  return res.json();
}

export async function obtenerProductoPorNombre(nom) {
  const res = await fetch(`${API_URL}/producto/${nom}`);
  return res.json();
}

export async function obtenerProductosPorCategoria(idCategoria) {
  const res = await fetch(`${API_URL}/categoria/${idCategoria}/producto`);
  return res.json();
}


export async function obtenerProductosMasVendidos() {
  const res = await fetch(`${API_URL}/producto/masvendidos`);
  return res.json();
}


export async function buscarProducto(buscar) {
  const res = await fetch(`${API_URL}/producto/buscar/${buscar}`);
  return res.json();
}

export async function modificarProducto(id, data) {
  const res = await fetch(`${API_URL}/producto/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(`${API_URL}/producto/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}