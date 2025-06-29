const API_URL = "http://localhost:3000"

export async function crearOrdenDesdeCarrito(usuarioId) {
  const res = await fetch(`${API_URL}/orden/desde-carrito/${usuarioId}`, {
    method: 'POST'
  });
  return res.json();
}

export async function obtenerOrdenesPorUsuario(usuarioId) {
  const res = await fetch(`${API_URL}/orden/${usuarioId}`);
  return res.json();
}

export async function obtenerOrdenes() {
  const res = await fetch(`${API_URL}/orden`);
  return res.json();
}

export async function cancelarOrden(ordenId) {
  const res = await fetch(`${API_URL}/orden/${ordenId}`, {
    method: 'DELETE'
  });
  return res.text();
}
