import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NuevaCategoria({agregarCategoria}) {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate()
  const handleSubmit = () => {
    if (nombre.trim() === "") return;

    const nuevaCategoria = {
      nombre,
    };
    try{
      agregarCategoria(nuevaCategoria)
      alert(`categoria ${nuevaCategoria.nombre} creada exitosamente !`)
      navigate('/dashboard')
    }catch(e){
      alert('No se pudo crear la categoria ')
    }
    

  };

  return (
    <div className="flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Nueva categoría</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la categoría"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Crear categoría
          </button>
        </div>
      </div>
    </div>
  );
}
