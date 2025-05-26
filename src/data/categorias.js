// Si no existen categorías, inicializamos un array vacío
if (!localStorage.getItem("categorias")) {
  localStorage.setItem("categorias", JSON.stringify([]));
}

// Guardar una nueva categoría
export const guardarCategoria = (categoria) => {
  const categorias = obtenerCategorias();
  categorias.push(categoria);
  localStorage.setItem("categorias", JSON.stringify(categorias));
};

// Obtener todas las categorías
export const obtenerCategorias = () => {
  return JSON.parse(localStorage.getItem("categorias")) || [];
};

// Actualizar todas las categorías (por si necesitas editar o eliminar alguna)
export const actualizarCategorias = (nuevasCategorias) => {
  localStorage.setItem("categorias", JSON.stringify(nuevasCategorias));
};
