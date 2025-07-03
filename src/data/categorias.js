import { API_URL } from './config.js';

export async function obtenerCategorias() {
  const res = await fetch(`${API_URL}/categoria`);
  return res.json();
}

export async function crearCategoria(data) {
  const res = await fetch(`${API_URL}/categoria`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
