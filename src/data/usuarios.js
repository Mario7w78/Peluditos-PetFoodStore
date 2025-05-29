const Admin = [
  {
    id: "admin",
    nombre: "Administrador",
    email: "admin@peluditos",
    password: "admin123",
    dni: "",
    age: "",
    rol: "admin", 
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
