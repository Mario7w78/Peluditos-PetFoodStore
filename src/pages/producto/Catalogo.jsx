import { Item } from "./Item";
import { useLocation } from "react-router-dom";
export const Catalogo = ({ productos }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const busqueda = params.get("busqueda");
  const categoria = params.get("categoria");
  const lista = busqueda
  ? productos.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
  : categoria
  ? productos.filter((p) => p.categoriaId == categoria)
  : productos;
  return (
    <div className="m-10 flex gap-4 justify-center flex-wrap">
      {lista.map((p) => (
        <Item producto={p} />
      ))}
    </div>
  );
};
