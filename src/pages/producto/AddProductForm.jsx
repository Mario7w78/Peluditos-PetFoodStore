import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

function AddProductForm({agregarProducto, categorias}) {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenBase64, setImagenBase64] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [presentacionError, setPresentacionError] = useState("");
  const [camposIncompletos, setCamposIncompletos] = useState(false);

  const handleCrearProducto = () => {

    if (
      nombre.trim() === "" ||
      presentacion.trim() === "" ||
      descripcion.trim() === "" ||
      stock === "" ||
      precio === "" ||
      categoriaSeleccionada === "" ||
      !imagenBase64 
    ) {
      setCamposIncompletos(true);
      return;
    }

    const nuevoProducto = {
      nombre,
      presentacion,
      descripcion,
      stock,
      precioUnitario: parseFloat(precio),
      imgurl: imagenBase64,
      categoriaId: categoriaSeleccionada,
    };

    agregarProducto(nuevoProducto);
    navigate("/productos");
  };

  const convertirABase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImagenChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertirABase64(file);
        setImagenBase64(base64);
      } catch (error) {
        console.error('Error al convertir imagen:', error);
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-6 text-blue-700">Agregar un producto</h2>

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
              <input
                type="text"
                placeholder="Ej: 500g o 1.5kg"
                className="w-full border rounded px-3 py-2 text-sm text-black"
                value={presentacion}
                onChange={(e) => {
                  const value = e.target.value;
                  setPresentacion(value);
                }}
              />
              {presentacionError && (
                <p className="text-red-500 text-sm mt-1">{presentacionError}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Categoría</label>
              <select
                className="w-full border rounded px-3 py-2 text-sm text-black"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map(categoria=>(
                  <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Descripción</label>
              <textarea
                placeholder="Descripción del producto..."
                className="w-full border rounded px-3 py-2 text-sm"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Precio (S/)</label>
              <input
                type="number"
                placeholder="Ej: 4.90"
                className="w-full border rounded px-3 py-2 text-sm"
                value={precio}
                onChange={(e) => {
                  const val = e.target.value;
                  setPrecio(parseFloat(val));
                }}
              />
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div className="border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center p-6 text-center relative h-85">
              {imagenBase64 ? (
                <img src={imagenBase64} alt="Vista previa" className="max-h-full object-contain mx-auto" />
              ) : (
                <div className="text-gray-500 text-sm">Arrastra tu imagen o haz clic aquí</div>
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
                  placeholder="Cantidad en stock"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={stock}
                  onChange={(e) => {
                    const value = e.target.value;
                    setStock(parseInt(value));
                  }}
                />
              </div>
              <button
                onClick={handleCrearProducto}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                Crear producto
              </button>
            </div>
          </div>
        </div>

        {camposIncompletos && (
          <p className="text-red-500 text-sm mt-4">
            Todos los campos deben estar completos correctamente para crear un producto.
          </p>
        )}

        <button
          onClick={() => navigate("/productos")}
          className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}

export default AddProductForm;
