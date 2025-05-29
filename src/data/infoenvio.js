// Estableceremos algunos productos por default.
// Desde la pagina para seleccionar los productos, se deberia seleccionar cada uno para ingresarlo en la lista
const envio = [
    // No contiene ningun elemento, porque es informacion personalizada que se ira rellenando
]

// Esto nos permite almacenar un string de caracteres en un objeto de manera local para toda la aplicacion web

localStorage.setItem('envioGuardar', JSON.stringify(envio));

export const guardarEnvio = (envioRegistrado) => {
    let envios = JSON.parse(localStorage.getItem("envioGuardar")) || [];
    envios.push(envioRegistrado);
    localStorage.getItem("envioGuardar", JSON.stringify(envio))
};

export const obtenerEnvio = () => {
    return JSON.parse(localStorage.getItem("envioGuardar"))
}
