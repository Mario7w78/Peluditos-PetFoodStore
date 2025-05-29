/*
Colocar un sonido cada vez que se clickea un producto en la tienda

El Checkout tendra un contenedor con direccion de envio que contendra:
 - Nombre, apellido, ciudad, departamento, direccion, codigo postal, telefono de contacto
 - Metodo de pago en efectivo o mediante alguna tarjeta de credito (visa, mastercard, paypal
 - Habra un boton para enviar informacion que enviara al usuario hacia PedidoCompleto)
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guardarEnvio } from "../data/infoenvio";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { guardarProducto } from "../data/productos";

const Checkout = () => {
    const navigate = useNavigate();
    const [datosEnvio, setDatosEnvio] = useState({
        nombre: "",
        apellido: "",
        ciudad: "",
        departamento: "",
        direccion: "",
        codigoPostal: "",
        telefono: "",
        metodoPago: "efectivo",
    });

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setDatosEnvio({ ...datosEnvio, [e.target.name]: e.target.value });
    };

    // Enviar información y redirigir a PedidoCompleto
    const handleSubmit = (e) => {
        e.preventDefault();
        guardarEnvio(datosEnvio);
        navigate("/pedido");
    };

    return (
        <div className="min-h-screen flex flex-col">
            
            <main className="flex-grow p-6">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>

                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="text-lg font-semibold">Dirección de Envío</h2>
                    <input type="text" name="nombre" placeholder="Nombre" value={datosEnvio.nombre} onChange={handleChange} required />
                    <input type="text" name="apellido" placeholder="Apellido" value={datosEnvio.apellido} onChange={handleChange} required />
                    <input type="text" name="ciudad" placeholder="Ciudad" value={datosEnvio.ciudad} onChange={handleChange} required />
                    <input type="text" name="departamento" placeholder="Departamento" value={datosEnvio.departamento} onChange={handleChange} required />
                    <input type="text" name="direccion" placeholder="Dirección" value={datosEnvio.direccion} onChange={handleChange} required />
                    <input type="text" name="codigoPostal" placeholder="Código Postal" value={datosEnvio.codigoPostal} onChange={handleChange} required />
                    <input type="tel" name="telefono" placeholder="Teléfono de contacto" value={datosEnvio.telefono} onChange={handleChange} required />

                    <h2 className="text-lg font-semibold mt-4">Método de Pago</h2>
                    <select name="metodoPago" value={datosEnvio.metodoPago} onChange={handleChange} required>
                        <option value="efectivo">Efectivo</option>
                        <option value="visa">Visa</option>
                        <option value="mastercard">MasterCard</option>
                        <option value="paypal">PayPal</option>
                    </select>
                    &nbsp;
                    <Link to="/pedido">
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                            Finalizar Compra
                        </button>
                    </Link>
                </form>
            </main>
        </div>
    );
};

export default Checkout;