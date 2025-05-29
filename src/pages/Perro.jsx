import React, { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const Perro = () => {
  const { productos } = useProductContext();
  const productosPerro = productos.filter(
    (producto) => producto.categoria?.toLowerCase() === "perros"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 6;
  const totalPages = Math.ceil(productosPerro.length / productosPorPagina);
  const inicio = (currentPage - 1) * productosPorPagina;
  const productosMostrados = productosPerro.slice(inicio, inicio + productosPorPagina);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Todo para perros</h1>
        <p className="text-gray-700 text-lg">
          Encuentra productos ideales para tu perro: alimentos, juguetes, correas y más.
        </p>
      </div>

      {productosMostrados.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos para perros disponibles.</p>
      ) : (
        <>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosMostrados.map((producto) => (
              <div key={producto.id} className="bg-white border rounded-lg p-4 shadow flex flex-col">
                <Link to={`/producto/${producto.id}`}>
                  {producto.imagen && (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-40 object-cover rounded mb-3 cursor-pointer"
                    />
                  )}
                </Link>
                <Link to={`/producto/${producto.id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 hover:underline cursor-pointer">
                    {producto.nombre}
                  </h3>
                </Link>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Presentación:</strong> {producto.presentacion}
                </p>
                <p className="text-blue-600 font-bold mt-1">S/ {producto.precio}</p>
                <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm mt-3">
                  Añadir al carrito
                </button>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </main>
  );
};

export default Perro;