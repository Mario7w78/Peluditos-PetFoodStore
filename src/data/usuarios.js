

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

export const guardarUsuario = (usuario) => {
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

export const obtenerUsuarios = () => {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
};
