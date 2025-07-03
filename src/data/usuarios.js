import { API_URL } from './config.js';

export async function crearUsuario(data) {
  const res = await fetch(`${API_URL}/usuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function obtenerUsuarios() {
  const res = await fetch(`${API_URL}/usuario`);
  return res.json();
}

export async function loginUsuario(data) {
  const res = await fetch(`${API_URL}/usuario/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function obtenerUsuarioPorId(id) {
  const res = await fetch(`${API_URL}/usuario/${id}`);
  return res.json();
}

export async function eliminarUsuario(id) {
  const res = await fetch(`${API_URL}/usuario/${id}`, {
    method: 'DELETE'
  });
  return res.text();
}

export async function desactivarUsuario(id, data) {
  const res = await fetch(`${API_URL}/usuario/${id}/desactivar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
