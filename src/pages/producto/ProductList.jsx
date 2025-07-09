import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "@/context/ProductContext";
import { AuthContext } from "@/context/AuthContext";

function ProductList() {
  const navigate = useNavigate();
  const { productos, eliminarProductos } = useContext(ProductContext);
  const { user } = useContext(AuthContext);

  const handleDelete = (id) => {
    eliminarProductos(id);
    alert("Producto eliminado correctamente - Recargar la página para ver los cambios");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Lista de Productos</h2>

          {user?.rol === "admin" && (
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/agregar-producto")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                Agregar otro producto
              </button>
            </div>
          )}
        </div>

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
                  <th className="px-6 py-3 text-left">Categoría</th>
                  <th className="px-6 py-3 text-left">Stock</th>
                  {user?.rol === "admin" && (
                    <th className="px-6 py-3 text-left">Acciones</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productos.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {producto.imgurl ? (
                        <img
                          src={producto.imgurl}
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
                    <td className="px-6 py-4">{producto.categoriaId}</td>
                    <td className="px-6 py-4">{producto.stock}</td>
                    {user?.rol === "admin" && (
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                          onClick={() => navigate(`/editar-producto/${producto.id}`)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                          onClick={() => handleDelete(producto.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    )}
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
