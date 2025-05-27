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
import { actualizarProductos, eliminarProductos } from "../data/productos";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/CarritoStyles";


const CarritoCompra = () => {
    // modificarProductos
    const { productos, eliminarProducto } = useProductContext();
    // console.log(productos); 
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
    }, [contador]); // Esto indica los cambios de efectos inclinados hacia contador

    // ¿Realizar un localStorage para las subidas y bajadas de las cantidades
    // como un reemplazo de un array dinamico?
    // El contador de Incrementos podria estar adherido a la funcion de actualizar cantidad, si incremento
    // fuese menor a 0 entonces sube reduc, de otra manera, sube incr

    // Función para aumentar o disminuir cantidad
    const actualizarCantidad = (id, incremento) => {
        // Contador de incrementos:
        // Contador de incrementos que comienza desde el numero 0
        const [conteoIncrementos, setconteoIncrementos] = useState(0);
        const [conteoReducciones, setconteoReducciones] = useState(0);

        // Por cada vez que presiona el boton de actualizarCantidad, subira un contador
        const conteoIncrementosFunct = () => {
            useEffect(() => {
                conteoIncrementos.forEach(cont => {
                    setconteoIncrementos(conteoIncrementos + 1);
                });
            }, [conteoIncrementos]);
        }

        const conteoReduccionesFunct = () => {
            useEffect(() => {
                conteoReducciones.forEach(contRed => {
                    setconteoReducciones(conteoReducciones + 1);
                });
            }, [conteoReducciones]);
        }

        const nuevosProductos = productos.map((prod) =>
            // ...prod utiliza un operador de propagacion para que obtenga las propiedades de prod, unicamente que
            // cambia la cantidad
            {incremento < 0 &&
                prod.id === id ? { ...prod, stock: Math.max(1, prod.stock + incremento) } : prod
                stockVariable[prod] = conteoIncrementos;
            }
        );
        return actualizarProductos(nuevosProductos) && stockVariable;
    };
    
    // Existira un contador para cuando suba una unidad para cada producto, pero cada producto tiene un
    // precioUnidad distinto, por lo que crearemos un array que contenga un espacio para cada cantidad
    // extra de producto
    // 
    // Declarar un array stockVariable[5]
    // Obtener id, stock, precio de cada producto.
    // Por cada producto.id:
    //      Obtener el precioUnidad de un determinado producto.id
    //      Ingresarlo en un array precioUnidades[5]
    // Obtener las cantidades utilizando actualizarCantidad():
    //      Obtener el stockVariable de un determinado producto.id
    //      Ingresarlo en un array stockVariable[5]
    // Declarar un array totalPrecioProductosArr[5]
    // Por i hasta totalPrecioProductos.length:
    //      totalPrecioProductosArr[i] = precioUnidades[i] * stockVariable[i];
    //      const totalPrecioProductos += totalPrecioProductosArr[i];
    // const total = {prod.precio} + totalPrecioProductos
    // return total

    // conteoIncrementos
    // conteoReducciones
    // Funcion para obtener el precio total de los productos
    const calcularPrecio = (conteoIncrementos) => {
        const initializationArr = [];

        // Obtendremos los precios de las unidades de cada producto
        // En esta ocasion, utilizaremos la funcion forEach(valor actual, index, arreglo)
        // Alternativamente es posible utilizar .map(), pero resulta complicado ingresar valores en un array
        productos.forEach(function(productos, index){
            const precioUnidad = {productos.precio} / {productos.stock};
            precioUnidades[index] = precioUnidad;
        });
        
        //  Obtener las cantidades utilizando actualizarCantidad():
        //      Obtener el stockVariable de un determinado producto.id
        //      Ingresarlo en un array stockVariable[5]

        // Obtendremos las cantidades de cada uno de los productos
        productos.forEach(function(stockVariable, index){
            // Obtener el array

        });

        const totalPrecio = productos.map((prod) => (
            
            // Esta parte esta en relacion con el aumento de las cantidades del precioUnidad
            const precioUnidad = {prod.precio} / {prod.stock}
            
            // Esta parte muestra el total del precio original + stock añadido durante la pagina de carro de compras
            // El stockAñadido no tendria que tener un valor distinto, porque el simbolo cambiaria segun sea positivo
            // o negativo
            const total = {prod.precio} + precioUnidad * {prod.stockVariable};

            return total;
        ))
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
                                        <img src={prod.imagen} alt={prod.nombre} width={80} className="rounded" />
                                        <div>
                                            <p className="font-semibold">{prod.nombre}</p>
                                            {/*La funcion toFixed() sirve para redondear valores*/}
                                            <p>Precio: ${prod.precio.toFixed(2)}</p>
                                            <p>Cantidad: {prod.stock}</p>
                                            {/* Botones de cantidad */}
                                            <div className="flex gap-2 mt-2">
                                                <button className="bg-gray-300 px-2 py-1 rounded">
                                                    -
                                                </button>
                                                <button className="bg-gray-300 px-2 py-1 rounded">
                                                    +
                                                </button>
                                                <button>Prueba</button>
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
                        <p><strong>Total:</strong></p>

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
