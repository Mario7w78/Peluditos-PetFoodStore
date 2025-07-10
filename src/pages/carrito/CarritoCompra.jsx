import React, { useEffect, useState, useContext, } from "react";
import { Link } from "react-router-dom";
import styles from "@/styles/CarritoStyles";
import { DetallesCarrito } from "./detallesCarrito";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import offer from "@/assets/Limited-offer.jpg";

const CarritoCompra = () => {
  const { user } = useContext(AuthContext);
  const {obtenerDetalleCarritoporId, carritoPorUsuario, eliminarProductoDelCarrito} = useContext(CartContext);

  const [carrito, setCarrito] = useState(null);
  const [detalleCarrito, setDetalleCarrito] = useState([]);
  const [contador, setContador] = useState(30);

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const data = await carritoPorUsuario(user.id);
        const detalles = await obtenerDetalleCarritoporId(data.id);
        setCarrito(data);
        setDetalleCarrito(detalles);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };
    if (user) {
      cargarCarrito();
    }else{
    return(<h1 className="text-4xl text-center">DEBE INICIAR SESION PARA AGREGAR PRODUCTOS AL CARRITO</h1>)  
    
    }
  }, [user]);

  // Utilizaremos useEffect con setInterval para realizar un contador con segunderos
  // de tiempo para la oferta y va bajando por cada 1000 milisegundos.
  useEffect(() => {
    if (contador > 0) {
      const timer = setInterval(() => setContador((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [contador]);

  
  const calcularTotal = () => {
    if (!carrito) return 0;
    return detalleCarrito.productos.reduce(
      (acc, prod) => acc + prod.DetalleCarrito.subtotal,
      0
    );
  };

  const actualizarCantidadProducto = (idDetalleCarrito, nuevaCantidad) => {
    setDetalleCarrito((detalle) => {
      const nuevosProductos = detalle.productos.map((producto) => {
        if (producto.DetalleCarrito.id === idDetalleCarrito) {
          return {
            ...producto,
            DetalleCarrito: {
              ...producto.DetalleCarrito,
              cantidad: nuevaCantidad,
              subtotal: nuevaCantidad * producto.DetalleCarrito.precioUnitario,
            },
          };
        }
        return producto;
      });
      return { ...detalle, productos: nuevosProductos };
    });
  };
  
  const eliminarProducto = async (productoId) => {
    try {
      await eliminarProductoDelCarrito(carrito.id, productoId);
      if (carrito && carrito.productos) {
        const carritoActualizado = {
          ...carrito,
          productos: carrito.productos.filter((p) => p.id !== productoId),
        };
        setCarrito(carritoActualizado);
      }

      // Actualizar el detalleCarrito
      if (detalleCarrito && detalleCarrito.productos) {
        const detalleActualizado = {
          ...detalleCarrito,
          productos: detalleCarrito.productos.filter(
            (p) => p.id !== productoId
          ),
        };
        setDetalleCarrito(detalleActualizado);
        calcularTotal();
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Carro de Compra</h1>

        {/* Contenedor principal con Flexbox */}
        <div className="flex gap-6">
          {/* Columna izquierda: Productos seleccionados */}
          <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Productos Seleccionados
            </h2>
            {carrito && carrito.productos.length > 0 ? (
              <ul className="space-y-4">
                {detalleCarrito.productos.map((prod) => (
                  <DetallesCarrito
                    prod={prod}
                    eliminarProducto={eliminarProducto}
                    actualizarCantidadProducto = {actualizarCantidadProducto}
                  />
                ))}
              </ul>
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
          </div>

          {/* Columna derecha: Resumen de compra */}
          <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Resumen de la compra</h2>
            <p>
              <strong>Productos:</strong> {carrito?.productos.length || 0}
            </p>
            <p>
              <strong>Total:</strong> S/.{calcularTotal().toFixed(2)}
            </p>

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
        <img

          src={offer}
          alt="centered image"
          className={styles.image_offer}
        />
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
