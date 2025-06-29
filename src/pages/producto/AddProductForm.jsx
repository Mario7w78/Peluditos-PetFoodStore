import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "@/context/ProductContext";

function AddProductForm({agregarProducto, categorias}) {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [presentacionError, setPresentacionError] = useState("");
  const [camposIncompletos, setCamposIncompletos] = useState(false);

  const validarPresentacion = (value) => {
    const val = value.toLowerCase().trim();
    const gramos = /^(100|[1-8][0-9]{2}|900)g$/;
    const kilos = /^(1|1\.5|2|2\.5|3|3\.5|4|4\.5|5|5\.5|6|6\.5|7|7\.5|8|8\.5|9)kg$/;

    if (!gramos.test(val) && !kilos.test(val)) {
      setPresentacionError("");
      return false;
    } else {
      setPresentacionError("");
      return true;
    }
  };

  const handleCrearProducto = () => {
    const presentacionValida = validarPresentacion(presentacion);

    if (
      nombre.trim() === "" ||
      presentacion.trim() === "" ||
      descripcion.trim() === "" ||
      stock.trim() === "" ||
      precio.trim() === "" ||
      categoriaSeleccionada === "" ||
      !previewUrl ||
      !presentacionValida
    ) {
      setCamposIncompletos(true);
      return;
    }

    const nuevoProducto = {
      id: crypto.randomUUID(),
      nombre,
      presentacion,
      descripcion,
      stock,
      precioUnitario: parseFloat(precio),
      imgurl: previewUrl,
      categoria: categoriaSeleccionada,
    };

    agregarProducto(nuevoProducto);
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
                  if (/^[0-9.,kgKG]*$/.test(value)) {
                    setPresentacion(value);
                    validarPresentacion(value);
                  }
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
                type="text"
                placeholder="Ej: 4.90"
                className="w-full border rounded px-3 py-2 text-sm"
                value={precio}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*[.,]?\d{0,2}$/.test(val)) {
                    setPrecio(val);
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div className="border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center p-6 text-center relative h-85">
              {previewUrl ? (
                <img src={previewUrl} alt="Vista previa" className="max-h-full object-contain mx-auto" />
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
                  type="text"
                  placeholder="Cantidad en stock"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={stock}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^\d+$/.test(value)) {
                      setStock(value);
                    }
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
