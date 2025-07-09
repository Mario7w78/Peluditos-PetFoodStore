import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "@/context/ProductContext";
import { CartContext } from "@/context/CartContext";

const ProductDetail = () => {
  const { productoId } = useParams();
  const [producto, setProducto] = useState({})
  const { obtenerProductoPorId } = useContext(ProductContext);
  const { AgregarAlCarrito } = useContext(CartContext);

  useEffect( () => {
    async function fetchProducto() {
      try {
        const response = await obtenerProductoPorId(productoId); 
        setProducto(response); 
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    }
    fetchProducto()
    
  }, []);

  if (!producto) {
    return (
      <p className="text-center mt-10 text-gray-500">Producto no encontrado</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row max-w-4xl w-full">
        <img
          src={producto.imgurl}
          alt={producto.nombre}
          className="w-full md:w-1/2 h-60 object-cover rounded mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {producto.nombre}
          </h2>
          <p className="text-gray-600 mb-2">
            <strong>Presentación:</strong> {producto.presentacion}
          </p>
          <p className="text-gray-700 mb-4">{producto.descripcion}</p>
          <p>Stock: {producto.stock}</p>
          <p className="text-blue-600 font-bold text-xl mb-4">
            S/ {producto.precioUnitario}
          </p>
          <button onClick={()=>AgregarAlCarrito(producto)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
