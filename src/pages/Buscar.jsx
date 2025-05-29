import React from "react";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

const Buscar = () => {
  const { productos } = useProductContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const resultados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(query) ||
    p.descripcion.toLowerCase().includes(query) ||
    p.categoria.toLowerCase().includes(query)
  );

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Resultados para: <span className="text-blue-600">{query}</span>
        </h1>
        {resultados.length === 0 ? (
          <p className="text-gray-500">No se encontraron productos.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resultados.map((p) => (
              <div key={p.id} className="bg-white border rounded-lg p-4 shadow">
                <img src={p.imagen} alt={p.nombre} className="w-full h-40 object-cover rounded mb-2" />
                <h3 className="text-lg font-semibold">{p.nombre}</h3>
                <p className="text-gray-600 text-sm">{p.descripcion}</p>
                <p className="text-green-600 font-bold mt-1">S/ {p.precio}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Buscar;
