const Admin = [
  {
    id: "admin",
    nombre: "admin",
    email: "admin@peluditos",
    password: "admin123",
    age: "",
    dni: "",
    admin: true,
    fechaRegistro: new Date().toLocaleDateString(),
    canlogin: true
  },
  {
    id: "12345678",
    nombre: "Pepito",
    email: "pepe@flores",
    password: "pepeflores23",
    age: "2000-01-01",
    dni: "72761974",
    admin: false,
    fechaRegistro: "12/12/2012",
    canlogin: true
  },
];

if (!localStorage.getItem("usuarios")) {
  localStorage.setItem("usuarios", JSON.stringify(Admin));
}

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

export const guardarUsuario = (usuario) => {
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

export const obtenerUsuarios = () => {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
};
