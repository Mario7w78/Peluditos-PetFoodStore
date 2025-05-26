/*
// Estableceremos algunos productos por default.
// Desde la pagina para seleccionar los productos, se deberia seleccionar cada uno para ingresarlo en la lista
const product = [
    {id: '1', nombre: 'Alimento de Perro', marca: 'MioCane', image: 'src\images\mio-cane-premium-adulto.jpg', precio: 30.00, cantidad: 0},
    {id: '2', nombre: 'Alimento de Gato', marca: 'Gran Plus', image: 'src\images\f05dc3782be68460951971d76ba61130.jpg', precio: 30.00, cantidad: 0},
    {id: '3', nombre: 'Juguete de Perro', marca: 'PerroKan', image: 'src\images\OIP.jpg', precio: 20.00, cantidad: 0},
    {id: '4', nombre: 'Juguete de Gato', marca: 'GatoKan', image: 'src\images\OIP (1).jpg', precio: 20.00, cantidad: 0}
]
*/

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
