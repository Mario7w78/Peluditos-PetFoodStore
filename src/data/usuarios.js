const Admin = [
  {
    nombre: "admin",
    email: "admin@peluditos",
    password: "admin123",
    age: "",
    dni: "",
    Admin: true,
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

//Colocar el usuario del admin predefinido y un usuario pruebas
