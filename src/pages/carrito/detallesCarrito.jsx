import { useEffect, useState } from "react";
import { actualizarCantidad } from "@/data/carrito";

export const DetallesCarrito = ({ prod, eliminarProducto, actualizarCantidadProducto}) => {
  const [cantidadProductos, setCantidadProductos] = useState(
    prod.DetalleCarrito.cantidad
  );
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    if (
      cantidadProductos !== prod.DetalleCarrito.cantidad &&
      cantidadProductos > 0
    ) {
      const actualizar = async () => {
        try {
          setIsUpdating(true);
          await actualizarCantidad(prod.DetalleCarrito.id, cantidadProductos);
          actualizarCantidadProducto(prod.DetalleCarrito.id, cantidadProductos)
        } catch (error) {
          console.error("Error al actualizar cantidad:", error);
          setCantidadProductos(prod.DetalleCarrito.cantidad);
        } finally {
          setIsUpdating(false);
        }
      };

      const timeoutId = setTimeout(actualizar, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [cantidadProductos, prod.DetalleCarrito.cantidad, prod.DetalleCarrito.id]);

  return (
    <li key={prod.id} className="flex items-center gap-4 border-b pb-2 mb-2">
      <img src={prod.imgurl} alt={prod.nombre} width={80} className="rounded" />
      <div>
        <p className="font-semibold">{prod.nombre}</p>

        <p>Precio: S/.{prod.DetalleCarrito.precioUnitario.toFixed(2)}</p>
        <p>Cantidad: {cantidadProductos}</p>

        <div className="flex gap-2 mt-2">
          <button
            className="bg-gray-300 py-2 px-3 rounded"
            onClick={() =>
              setCantidadProductos((c) => {
                if (c === 1) {
                  return c;
                }
                return c-1
              })
            }
          >
            -
          </button>
          <button
            className="bg-gray-300 py-2 px-3 rounded"
            onClick={() => setCantidadProductos((c) => c + 1)}
          >
            +
          </button>
        </div>
        <button
          onClick={() => eliminarProducto(prod.id)}
          className="text-red-500 mt-2"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};
