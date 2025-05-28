const ordenesBase = [
  {
    id: "1",
    fecha: "2023-10-01",
    total: 150.0,
    productos: [
      { id: "p1", nombre: "Producto 1", cantidad: 2, precio: 50.0 },
      { id: "p2", nombre: "Producto 2", cantidad: 1, precio: 50.0 },
    ],
    usuarioid: "admin",
  },
  {
    id: "2",
    fecha: "2023-10-05",
    total: 200.0,
    productos: [
      { id: "p3", nombre: "Producto 3", cantidad: 4, precio: 40.0 },
      { id: "p4", nombre: "Producto 4", cantidad: 2, precio: 20.0 },
    ],
    usuarioid: "admin",
  },
  {
    id: "3",
    fecha: "2023-10-10",
    total: 120.0,
    productos: [
      { id: "p5", nombre: "Producto 5", cantidad: 1, precio: 60.0 },
      { id: "p6", nombre: "Producto 6", cantidad: 2, precio: 30.0 },
    ],
    usuarioid: "admin",
  },
  {
    id: "4",
    fecha: "2023-10-15",
    total: 300.0,
    productos: [
      { id: "p7", nombre: "Producto 7", cantidad: 3, precio: 80.0 },
      { id: "p8", nombre: "Producto 8", cantidad: 1, precio: 60.0 },
    ],
    usuarioid: "admin",
  },
];

// Inicializar localStorage con las órdenes base si no existen
if (!localStorage.getItem("ordenes")) {
  localStorage.setItem("ordenes", JSON.stringify(ordenesBase));
}

export const guardarOrden = (orden) => {
  const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
  ordenes.push(orden);
  localStorage.setItem("ordenes", JSON.stringify(ordenes));
};

export const obtenerOrdenes = () => {
  return JSON.parse(localStorage.getItem("ordenes")) || [];
};
