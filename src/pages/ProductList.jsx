import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext"; // Asegúrate de que esta ruta sea correcta
import { obtenerCategorias } from "../data/categorias";

function ProductList() {
  const navigate = useNavigate();
  const { productos } = useProductContext(); // Obtenemos los productos del contexto

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md border">
        {/* Encabezado con botones */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Lista de Productos</h2>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/agregar-producto")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
            >
              Agregar otro producto
            </button>
          </div>
        </div>

        {/* Tabla de productos */}
        {productos.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay productos disponibles.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-6 py-3 text-left">Imagen</th>
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-left">Presentación</th>
                  <th className="px-6 py-3 text-left">Descripción</th>
                  <th className="px-6 py-3 text-left">Categoria</th>
                  <th className="px-6 py-3 text-left">Stock</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productos.map((producto, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {producto.imagen ? (
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{producto.nombre}</td>
                    <td className="px-6 py-4">{producto.presentacion}</td>
                    <td className="px-6 py-4">{producto.descripcion}</td>
                    <td className="px-6 py-4">{producto.categoria}</td>
                    <td className="px-6 py-4">{producto.stock}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded">
                        Editar
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;


