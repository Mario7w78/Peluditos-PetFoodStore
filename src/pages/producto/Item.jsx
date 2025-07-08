import { useNavigate } from "react-router-dom";
export const Item = ({ producto, AgregarAlCarrito }) => {

  const navigate = useNavigate();
  return (
    <div className="max-h-[400px] max-w-[200px] min-w-[200px] p-3 py-4 flex flex-col shadow-2xl shadow-purple-400 rounded-2xl">
      <img className="aspect-square" src={producto.imgurl} />
      <p className="font-bold text-purple-600">{producto.nombre}</p>
      <p>Precio: S/.{producto.precioUnitario}</p>
      <p>Stock: {producto.stock}</p>
      <div className="flex flex-col items-center gap-2 my-4">
        <button
          onClick={() => navigate(`/productdetail/${producto.id}`)}
          className="bg-gradient-to-b from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold rounded-2xl w-[90%] text-white  p-2"
        >
          Ver detalle
        </button>
        <button onClick={()=>AgregarAlCarrito(producto)} className="bg-gradient-to-b from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold rounded-2xl w-[90%] text-white p-2">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
