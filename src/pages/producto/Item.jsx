import { useNavigate } from "react-router-dom";

export const Item = ({ producto }) => {
  const navigate = useNavigate();
  return (
    <div className="border max-w-[200px] min-w-[200px] p-2 py-4 flex flex-col">
      <img className="aspect-square" src={producto.imgurl} />
      <p className="font-bold text-blue-600">{producto.nombre}</p>
      <p>Precio: S/.{producto.precioUnitario}</p>
      <p>Stock: {producto.stock}</p>
      <div className="flex flex-col gap-2 my-4">
        <button
          onClick={() => navigate(`/productdetail/${producto.id}`)}
          className="bg-blue-500 font-bold text-white p-2"
        >
          Ver detalle
        </button>
        <button className="bg-blue-500 font-bold text-white p-2">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
