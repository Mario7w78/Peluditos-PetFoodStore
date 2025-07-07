/*
Colocar un sonido cada vez que se clickea un producto en la tienda

El Checkout tendra un contenedor con direccion de envio que contendra:
 - Nombre, apellido, ciudad, departamento, direccion, codigo postal, telefono de contacto
 - Metodo de pago en efectivo o mediante alguna tarjeta de credito (visa, mastercard, paypal
 - Habra un boton para enviar informacion que enviara al usuario hacia PedidoCompleto)
*/

import React, { useState , useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CarritoResumen from "@/components/carritoResumen";
import { obtenerCarritoPorUsuario } from "../../data/carrito.js";
import { AuthContext } from "../../context/AuthContext";
import { obtenerDetalleCarrito } from "../../data/carrito.js";

const Checkout = ({actualizarDatosUsuario, crearOrdenes}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [datosEnvio, setDatosEnvio] = useState({
        nombresCompletos: "",
        apellidosCompletos: "",
        ciudad: "",
        departamento: "",
        direccion: "",
        codigoPostal: "",
        telefono: "",
        metodoPago: "efectivo",
    });
    const [carrito, setCarrito] = useState(null);
    const [detalle, setDetalle] = useState([]);

    useEffect(() => {
    const cargarDatos = async () => {
      try {
        const c = await obtenerCarritoPorUsuario(user.id);
        const d = await obtenerDetalleCarrito(c.id);
        setCarrito(c);
        setDetalle(d.productos); // asumimos que viene como { productos: [...] }
      } catch (e) {
        console.error("Error cargando carrito:", e);
      }
    };
    if (user) cargarDatos();
}, [user]);

    const calcularTotal = () => {
        return detalle.reduce((acc, p) => acc + p.DetalleCarrito.subtotal, 0);
    };

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setDatosEnvio({ ...datosEnvio, [e.target.name]: e.target.value });
    };

    

    // Enviar información y redirigir a PedidoCompleto
    const handleSubmit = async (e) => {
        e.preventDefault();
        await actualizarDatosUsuario(datosEnvio, user.id);
        const orderId = await crearOrdenes(user.id)
        navigate(`/pedido/${orderId.id}`);
    };



    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow p-6">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <div className="flex gap-6">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="text-lg font-semibold">Dirección de Envío</h2>
                    <input type="text" name="nombresCompletos" placeholder="Nombre" value={datosEnvio.nombresCompletos} onChange={handleChange} required />
                    <input type="text" name="apellidosCompletos" placeholder="Apellido" value={datosEnvio.apellidosCompletos} onChange={handleChange} required />
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

                    <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">
                        Finalizar Compra
                    </button>
                    <Link to="/pedido">
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                            Ir a Pedido Completo
                        </button>
                    </Link>
                </form>

                {/* Resumen del carrito */}
                <CarritoResumen
                    total={calcularTotal()}
                    cantidadProductos={detalle.length}
                />
                </div>
            </main>
        </div>
    );
};

export default Checkout;