import React from "react";
import { useProductContext } from "@/context/ProductContext";

function ProductTable({ limit = 5 }) {
  const { productos } = useProductContext();

  const productosAMostrar = limit ? productos.slice(0, limit) : productos;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Imagen</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Stock</th>
          </tr>
        </thead>
        <tbody>
          {productosAMostrar.map((producto) => (
            <tr key={producto.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">
                {producto.imagen ? (
                  <img src={producto.imagen} alt={producto.nombre} className="w-10 h-10 object-cover rounded" />
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-4 py-2">{producto.nombre}</td>
              <td className="px-4 py-2">{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
