import React from "react";
import { useNavigate } from "react-router-dom";
import { useCategoriesStore } from "../context/CategoriesContext";

function CategoryList() {
  const { categorias, removeCategoria } = useCategoriesStore();
  const navigate = useNavigate();

  const handleEliminar = (nombre) => {
    if (confirm(`¿Estás seguro de que deseas eliminar la categoría "${nombre}"?`)) {
      removeCategoria(nombre);
    }
  };

  const handleEditar = (categoria) => {
    // Por ahora solo mostramos un alert; podrías abrir un modal o redirigir
    alert(`Función de editar no implementada aún para: ${categoria.nombre}`);
    // Ejemplo para redireccionar:
    // navigate(`/editar-categoria/${categoria.nombre}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md border">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Lista de Categorías</h2>
          <button
            onClick={() => navigate("/agregar-producto")}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded text-sm"
          >
            Regresar
          </button>
        </div>

        {/* Tabla de categorías */}
        {categorias.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay categorías disponibles.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-left">Descripción</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categorias.map((categoria, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{categoria.nombre}</td>
                    <td className="px-6 py-4">{categoria.descripcion}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleEditar(categoria)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(categoria.nombre)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
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

export default CategoryList;
