// Estableceremos las variables
const Ordenes = () => {
    const [datosEnvio, setDatosEnvio] = useState({
        nombre: "",
        apellido: "",
        ciudad: "",
        departamento: "",
        direccion: "",
        codigoPostal: "",
        telefono: "",
        metodoPago: "efectivo"
    });
}

// Si no existen productos, inicializamos un array vacío
if (!localStorage.getItem("ordenes")) {
  localStorage.setItem("ordenes", JSON.stringify([]));
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

// Eliminar un nuevo producto
export const eliminarProductos = () => {
  localStorage.removeItem("productos", JSON.stringify(productos));
};

// Actualizar todos los productos (útil para ediciones o eliminaciones)
export const actualizarProductos = (nuevosProductos) => {
  localStorage.setItem("productos", JSON.stringify(nuevosProductos));
};

export default Ordenes;