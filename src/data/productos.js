// Si no existen productos, inicializamos un array vacío
if (!localStorage.getItem("productos")) {
  localStorage.setItem("productos", JSON.stringify([]));
}

// Guardar un nuevo producto
export const guardarProducto = (producto) => {
  const productos = obtenerProductos();
  productos.push(producto);
  localStorage.setItem("productos", JSON.stringify(productos));
};

// Obtener todos los productos
export const obtenerProductos = () => {
  return JSON.parse(localStorage.getItem("productos")) || [];
};

// Actualizar todos los productos (útil para ediciones o eliminaciones)
export const actualizarProductos = (nuevosProductos) => {
  localStorage.setItem("productos", JSON.stringify(nuevosProductos));
};
