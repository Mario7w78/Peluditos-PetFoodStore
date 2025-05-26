/*
1.- Registrar Producto {
    Pagina de producto: Ingresar valores por default en un js.
    Obtendremos un contexto RegistrarProducto
    Se mostrara una lista de productos en una pagina (Dos alternativas: Permitir el registro de productos en una pagina
    o que cada producto tenga su pagina). Presionaremos el boton "Guardar al carro".
    
    }
2.- Carrito de Compra (Obtener los valores de productos del contexto)
3.- Checkout
-----
1.- Mostrar el Header
2.- Carro {
    Mostrar los productos seleccionados: Imagen, nombre, descripcion, precio,
    eliminar del carro, aumentar o disminuir cantidad}
3.- Resumen de compra {
    Productos(numero total de productos)
    Total de costo
    Continuar compra a Checkout}
Ideas:
 - Un contador de segundos que muestre una oferta por tiempo limitado utilizando un conteo con useEffect
 - 
*/

// En teoria se añadiria un contador por cada producto ingresado utilizando un useEffect()

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductoContext } from "../context/ProductoContext"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/CarritoStyles";


const CarritoCompra = () => {
    const { productos, removeProducto, modificarProductos } = useContext(ProductoContext);
    // Contador de oferta con tiempo limitado que comienza desde el segundo 30
    const [contador, setContador] = useState(30);

    // Utilizaremos useEffect con setInterval para realizar un contador con segunderos
    // de tiempo para la oferta y va bajando por cada 1000 milisegundos.
    useEffect(() => {
        if (contador > 0) {
            const timer = setInterval(() =>
                setContador((prev) => prev - 1), 1000);
            return () => clearInterval(timer); // Limpieza del intervalo
        }
    }, [contador]); // Esto indica que los cambios de efectos inclinados hacia contador

    // Función para aumentar o disminuir cantidad
    const actualizarCantidad = (id, incremento) => {
        const nuevosProductos = productos.map((prod) =>
            // ...prod utiliza un operador de propagacion para que obtenga las propiedades de prod, unicamente que
            // cambia la cantidad
            prod.id === id ? { ...prod, cantidad: Math.max(1, prod.cantidad + incremento) } : prod
        );
        modificarProductos(nuevosProductos);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-6">
                <h1 className="text-2xl font-bold mb-4">Carro de Compra</h1>

                {/* Contenedor principal con Flexbox */}
                <div className="flex gap-6">
                    {/* Columna izquierda: Productos seleccionados */}
                    <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Productos Seleccionados</h2>
                        {productos.length > 0 ? (
                            <ul className="space-y-4">
                                {productos.map((prod) => (
                                    <li key={prod.id} className="flex items-center gap-4 border-b pb-2 mb-2">
                                        <img src={prod.image} alt={prod.nombre} width={80} className="rounded" />
                                        <div>
                                            <p className="font-semibold">{prod.nombre}</p>
                                            <p>Precio: ${prod.precio.toFixed(2)}</p>
                                            <p>Cantidad: {prod.cantidad}</p>

                                            {/* Botones de cantidad */}
                                            <div className="flex gap-2 mt-2">
                                                <button onClick={() => actualizarCantidad(prod.id, -1)}
                                                    className="bg-gray-300 px-2 py-1 rounded"> - </button>
                                                <button onClick={() => actualizarCantidad(prod.id, 1)}
                                                    className="bg-gray-300 px-2 py-1 rounded"> + </button>
                                            </div>

                                            {/* Botón para eliminar */}
                                            <button onClick={() => removeProducto(prod.id)}
                                                className="text-red-500 mt-2">Eliminar</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay productos en el carrito.</p>
                        )}
                    </div>

                    {/*La razon del por que utilizamos {} es por el formato de js en una declaracion de jsx*/}
                    {/*En el caso de que el contador llegase a cero, simplemente desapareceria*/}
                    if({contador > 0}){
                        <div className="bg-red-500 text-white p-4 rounded-md text-center font-bold mb-4">
                            <image src="src\images\Limited-offer.jpg" alt="centered image" className={styles.image_offer}/>
                            La oferta finalizara en {contador} segundos
                        </div>
                    }

                    {/* Columna derecha: Resumen de compra */}
                    <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Resumen de la compra</h2>
                        <p><strong>Productos:</strong> {productos.length}</p>
                        <p><strong>Total:</strong> ${productos.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0).toFixed(2)}</p>

                        <Link to="/checkout">
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                                Continuar a Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CarritoCompra;
