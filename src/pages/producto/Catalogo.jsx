import { Item } from "./Item";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
export const Catalogo = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const busqueda = params.get("busqueda");
  const categoria = params.get("categoria");
  const { productos } = useContext(ProductContext);
  //ESTO SE DEBE HACER CON BACKEND ENDPOINTS
  const lista = busqueda
  ? productos.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
  : categoria
  ? productos.filter((p) => p.categoriaId == categoria)
  : productos;
  return (
    <div className="h-screen m-10 flex gap-4 justify-center flex-wrap">
      {lista.map((p) => (
        <Item producto={p}/>
      ))}
    </div>
  );
};
