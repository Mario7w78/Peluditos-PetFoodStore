import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "@/styles/CarritoStyles";
import { AuthContext } from "../../context/AuthContext";
import {
    obtenerCarritoPorUsuario,
    eliminarProductoDelCarrito,
} from "../../data/carrito";

const CarritoCompra = (obtenerDetallePorIdCarrito) => {
    const {user} = useContext(AuthContext);
    const [carrito, setCarrito] = useState(null);
    const [detalleCarrito, setDetalleCarrito] = useState([]);
    // modificarProductos
    //->const { productos, eliminarProducto, setProductos } = useProductContext();
    // console.log(productos); 
    // Contador de oferta con tiempo limitado que comienza desde el segundo 30
    const [contador, setContador] = useState(30);

    // Obtener el carrito del usuario al cargar el componente
    useEffect(() => {
        const cargarCarrito = async () => {
            try {
                const data = await obtenerCarritoPorUsuario(user.id);
                setCarrito(data);
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
            }
        };
        if (user) {
            cargarCarrito();
        }
    }, [user]);

    // Utilizaremos useEffect con setInterval para realizar un contador con segunderos
    // de tiempo para la oferta y va bajando por cada 1000 milisegundos.
    useEffect(() => {
        if (contador > 0) {
            const timer = setInterval(() =>
                setContador((prev) => prev - 1), 1000);
            return () => clearInterval(timer); // Limpieza del intervalo
        }
    }, [contador]); // Esto indica los cambios de efectos inclinados hacia contador

    // ¿Realizar un localStorage para las subidas y bajadas de las cantidades
    // como un reemplazo de un array dinamico?
    // El contador de Incrementos podria estar adherido a la funcion de actualizar cantidad, si incremento
    // fuese menor a 0 entonces sube reduc, de otra manera, sube incr

    // Función para aumentar o disminuir cantidad
    /*
    const actualizarCantidad = async (productoid, incremento) => {
        // ...prod utiliza un operador de propagacion para que obtenga las propiedades de prod, unicamente que
        // cambia la cantidad
        const nuevosProductos = productos.map((prod) => {
            if (prod.id === id) {
                // No permitir menos de 1
                const nuevaCantidad = Math.max(1, prod.stock + incremento);
                return { ...prod, stock: nuevaCantidad };
            }
            return prod;
        });
        setProductos(nuevosProductos);
        actualizarProductos(nuevosProductos);
    };
    */
    
    // Nuevo Actualizar cantidad
    const actualizarCantidad = async (productoid, incremento) => {
        const item = carrito.productos.find((prod) => prod.id === productoid);
        if (!item) return;
        const nuevaCantidad = Math.max(1, item.DetalleCarrito.cantidad + incremento);
        try {

            const data = await obtenerDetallePorIdCarrito(carrito.id);
            setCarrito(data);
        } catch (error) {
            console.error("Error al actualizar la cantidad:", error);
        }
    };

    // Función para eliminar un producto del carrito
    const eliminarProducto = async (productoId) => {
        try {
            await eliminarProductoDelCarrito(carrito.id, productoId);
            // Actualizar el carrito después de eliminar el producto
            const data = await obtenerCarritoPorUsuario(user.id);
            setCarrito(data);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };


    // Funcion para obtener el precio total de los productos
    const calcularTotal = () => {
        if (!carrito) return 0;
        return carrito.productos.reduce((acc, prod) => acc + prod.DetalleCarrito.subtotal, 0);
    };

    return (
        <div className="min-h-screen flex flex-col">

            <main className="flex-grow p-6">
                <h1 className="text-2xl font-bold mb-4">Carro de Compra</h1>

                {/* Contenedor principal con Flexbox */}
                <div className="flex gap-6">
                    {/* Columna izquierda: Productos seleccionados */}
                    <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Productos Seleccionados</h2>
                        {carrito && carrito.productos.length > 0 ? (
                            <ul className="space-y-4">
                                {carrito.productos.map((prod) => (
                                    <li key={prod.id} className="flex items-center gap-4 border-b pb-2 mb-2">
                                        <img src={prod.imagen} alt={prod.nombre} width={80} className="rounded" />
                                        <div>
                                            <p className="font-semibold">{prod.nombre}</p>
                                            {/*La funcion toFixed() sirve para redondear valores*/}
                                            <p>Precio: ${prod.DetalleCarrito.precioUnitario.toFixed(2)}</p>
                                            <p>Cantidad: {prod.DetalleCarrito.cantidad}</p>
                                            {/* Botones de cantidad */}
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    className="bg-gray-300 px-2 py-1 rounded"
                                                    onClick={() => actualizarCantidad(prod.id, -1)}
                                                >
                                                    -
                                                </button>
                                                <button
                                                    className="bg-gray-300 px-2 py-1 rounded"
                                                    onClick={() => actualizarCantidad(prod.id, 1)}
                                                >
                                                    +
                                                </button>
                                                {/* <button>Prueba</button> */}
                                            </div>

                                            {/* Botón para eliminar */}
                                            <button onClick={() => eliminarProducto(prod.id)}
                                                className="text-red-500 mt-2">Eliminar</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay productos en el carrito.</p>
                        )}
                    </div>

                    {/* Columna derecha: Resumen de compra */}
                    <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Resumen de la compra</h2>
                        <p><strong>Productos:</strong> {carrito?.productos.length || 0}</p>
                        <p><strong>Total:</strong> ${calcularTotal().toFixed(2)}</p>

                        <Link to="/checkout">
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                                Continuar a Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
            <aside>
                {/*La razon del por que utilizamos {} es por el formato de js en una declaracion de jsx*/}
                {/*En el caso de que el contador llegase a cero, simplemente desapareceria. El problema*/}
                {/* es que detiene todas las funcionalidades de los botones*/}
                <img src="src/images/Limited-offer.jpg" alt="centered image" className={styles.image_offer} />
                {contador > 0 && (
                    <div className="bg-red-500 text-white p-4 rounded-md text-center font-bold mb-4">
                        La oferta finalizara en {contador} segundos
                    </div>
                )}
            </aside>
        </div>
    );
};

export default CarritoCompra;
