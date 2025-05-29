import React, { useState } from "react";

function ModalNuevaCategoria({ isOpen, onClose, onCreate }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (nombre.trim() === "") return;

    const nuevaCategoria = {
      id: Date.now(),
      nombre,
      descripcion,
    };

    onCreate(nuevaCategoria); // ← Envía la nueva categoría al padre
    setNombre("");
    setDescripcion("");
    onClose(); // Cierra el modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
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

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Descripción</label>
          <textarea
            rows="4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del producto..."
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
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

export default ModalNuevaCategoria;
