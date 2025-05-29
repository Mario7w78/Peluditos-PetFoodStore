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
import { useProductContext } from "../context/ProductContext";
import { actualizarProductos } from "../data/productos";
//import { actualizarProductos, eliminarProductos } from "../data/productos";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/CarritoStyles";

var snd = new Audio("src\audio\snap-274158.mp3");

const CarritoCompra = () => {
    // modificarProductos
    const { productos, setProductos, eliminarProducto } = useProductContext();
    // console.log(productos); 
    // Contador de oferta con tiempo limitado que comienza desde el segundo 30
    const [contador, setContador] = useState(30);

    // Utilizaremos useEffect con setInterval para realizar un contador con segunderos
    // de tiempo para la oferta y va bajando por cada 1000 milisegundos.
    useEffect(() => {
        if (contador > 0) {
            const timer = setInterval(() =>
                setContador((prev) => prev - 1), 1000);
            return () => clearTimeout(timer); // Limpieza del intervalo
        }
    }, [contador]); // Esto indica los cambios de efectos inclinados hacia contador

    // El contador de Incrementos podria estar adherido a la funcion de actualizar cantidad, si incremento
    // fuese menor a 0 entonces sube reduc, de otra manera, sube incr

    // Declararemos una variable local para CarritoCompra
    const [stockVariable, setStockVariable] = useState({});

    // Contador de incrementos que comienza desde el numero 0
    const [conteoIncrementos, setconteoIncrementos] = useState(0);
    const [conteoReducciones, setconteoReducciones] = useState(0);

    
    const actualizarCantidad = (id, incremento) => {
        setStockVariable(prevStock => ({
            ...prevStock,
            [id]: (prevStock[id] || 0) + incremento
        }));

        /*
        const nuevosProductos = productos.map(prod =>
            prod.id === id ? { ...prod, stock: Math.max(1, prod.stock + incremento) } : prod
        );
        */

        const nuevosProductos = productos.map(prod => {
            if (prod.id === id) {
                return { ...prod, stock: Math.max(1, Number(prod.stock) + Number(incremento)) }; // Suma correctamente el incremento
            }
            return prod;
        });

        //setProductos(nuevosProductos); // Actualizar el estado correctamente
        //localStorage.setItem("productos", JSON.stringify(nuevosProductos)); //
        actualizarProductos(nuevosProductos);
    };
    
    /*
    const actualizarCantidad = (id, incremento) => {
        const nuevosProductos = productos.map(prod =>
            prod.id === id ? { ...prod, stock: Math.max(1, prod.stock + incremento) } : prod
        );

        setProductos(nuevosProductos); // Asegura que el estado se actualiza
        localStorage.setItem("productos", JSON.stringify(nuevosProductos)); // Guarda cambios en localStorage
    };
    */
    
    // Existira un contador para cuando suba una unidad para cada producto, pero cada producto tiene un
    // precioUnidad distinto, por lo que crearemos un array que contenga un espacio para cada cantidad
    // extra de producto
    // 
    // Declarar un array stockVariable[5]
    // Obtener id, stock, precio de cada producto.
    // Por cada producto.id:
    //      Obtener el precioUnidad de un determinado producto.id
    //      Ingresarlo en un array precioUnidades[5]
    // *** Este siguiente paso esta adjunto al componente de actualizarCantidad
    // Obtener las cantidades utilizando actualizarCantidad():
    //      Obtener el stockVariable de un determinado producto.id
    //      Ingresarlo en un array stockVariable[5]
    // ****
    // Declarar un array totalPrecioProductosArr[5]
    // Por i hasta totalPrecioProductos.length:
    //      totalPrecioProductosArr[i] = precioUnidades[i] * stockVariable[i];
    //      const totalPrecioProductos += totalPrecioProductosArr[i];
    // const total = {prod.precio} + totalPrecioProductos
    // return total

    // Funcion para obtener el precio total de los productos
    const calcularPrecio = () => {
        // const precioUnidades = {};
        let totalPrecioProductos = 0;

        // Obtendremos los precios de las unidades de cada producto (La funcion .map serviria, pero seria mucho mas
        // dificil de utilizar)
        const totalPrecioProductosArr = [];

        productos.forEach(prod => {
            const precioUnidad = Math.round(prod.precio / prod.stock);
            if (stockVariable[prod.id]) {
                totalPrecioProductosArr[productos.id] = precioUnidades[productos.id] * stockVariable[productos.id],
                totalPrecioProductos += totalPrecioProductosArr[productos.id];
                // precioUnidad * stockVariable[prod.id];
            }
        });

        return Math.round(productos.reduce((acc, prod) => acc + prod.precio * prod.stock, 0) + totalPrecioProductos)
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
                        {productos.length > 0 ? (
                            <ul className="space-y-4">
                                {productos.map((prod) => (
                                    <li key={prod.id} className="flex items-center gap-4 border-b pb-2 mb-2">
                                        <img src={prod.imagen} alt={prod.nombre} width={80} className="rounded"/>
                                        <div>
                                            <p className="font-semibold">{prod.nombre}</p>
                                            {/*La funcion toFixed() sirve para redondear valores*/}
                                            <p>Precio: ${prod.precio}</p>
                                            <p>Cantidad: {prod.stock} </p>
                                            {/* Botones de cantidad */}
                                            <div className="flex gap-2 mt-2">
                                                <button className="bg-gray-300 px-2 py-1 rounded" onClick={() => {actualizarCantidad(prod.id, -1); window.location.reload(); snd.play()}}>
                                                    -
                                                </button>
                                                <button className="bg-gray-300 px-2 py-1 rounded" onClick={() => {actualizarCantidad(prod.id, 1); window.location.reload(); snd.play()}}>
                                                    +
                                                </button>
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
                        <p><strong>Productos:</strong> {productos.length}</p>
                        {/*<p><strong>Total: </strong></p>*/}
                        <p><strong>Total: </strong>${calcularPrecio().toFixed(2)}</p>
                        {/*<p><strong>Total: </strong>${calcularTotal().toFixed(2)}</p>*/}
                        
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
                <image src="src\images\Limited-offer.jpg" alt="centered image" className={styles.image_offer} />
                {contador > 0}{
                    <div className="bg-red-500 text-white p-4 rounded-md text-center font-bold mb-4">
                        La oferta finalizara en {contador} segundos
                    </div>
                }
            </aside>
        </div>
    );
};

export default CarritoCompra;
