import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

function AddProductForm() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const { addProducto } = useProductContext();

  const handleRegresar = () => {
    navigate("/");
  };

  const handleCrearProducto = () => {
    const nuevoProducto = {
      id: crypto.randomUUID(),
      nombre,
      presentacion,
      descripcion,
      stock,
      imagen: previewUrl,
      categoria: categoriaSeleccionada,
    };

    addProducto(nuevoProducto);
    navigate("/productos");
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-6">Agregar un producto</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-sm">Nombre del producto</label>
              <input
                type="text"
                placeholder="Nombre del producto"
                className="w-full border rounded px-3 py-2 text-sm text-black"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Presentación</label>
              <select
                className={`w-full border rounded px-3 py-2 text-sm ${
                  presentacion === "" ? "text-gray-500" : "text-black"
                }`}
                value={presentacion}
                onChange={(e) => setPresentacion(e.target.value)}
              >
                <option value="">Seleccione la presentación</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Categoría</label>
              <select
                className={`w-full border rounded px-3 py-2 text-sm ${
                  categoriaSeleccionada === "" ? "text-gray-500" : "text-black"
                }`}
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                <option value="">Seleccionar la categoría</option>
                <option value="Perros">Perros</option>
                <option value="Gatos">Gatos</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Descripción</label>
              <textarea
                placeholder="Descripción del producto..."
                className="w-full border rounded px-3 py-2 text-sm"
                rows={4}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div className="flex-1 border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center p-6 text-center relative">
              {previewUrl ? (
                <img src={previewUrl} alt="Vista previa" className="max-h-40 object-contain mx-auto" />
              ) : (
                <div>
                  <div className="text-gray-500 text-3xl mb-2">🖼️</div>
                  <p className="text-sm text-gray-500 mb-2">Arrastra tu imagen a esta zona o sube la imagen</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImagenChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <div className="flex items-end gap-4 mt-4">
              <div className="w-full">
                <label className="block mb-1 font-medium text-sm">Stock</label>
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  placeholder="Cantidad en stock"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={stock}
                  onChange={(e) => {
                    const value = e.target.value;
                    const num = parseFloat(value);
                    if (value === "" || (num >= 1 && /^\d*\.?\d*$/.test(value))) {
                      setStock(value);
                    }
                  }}
                />
              </div>
              <button
                onClick={handleCrearProducto}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
              >
                Crear producto
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleRegresar}
          className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}

export default AddProductForm;
