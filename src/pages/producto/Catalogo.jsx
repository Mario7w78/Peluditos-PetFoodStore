import { Item } from "./Item";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "@/context/ProductContext";
export const Catalogo = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const busqueda = params.get("busqueda");
  const categoria = params.get("categoria");
  const { productos, buscarProductos } = useContext(ProductContext);
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      if (busqueda) {
        const resultado = await buscarProductos(busqueda);
        setLista(resultado);
      } else if (categoria) {
        const filtrados = await buscarProductos(categoria);
        setLista(filtrados);
      } else {
        setLista(productos);
      }
    };

    cargarProductos();
  }, [busqueda, categoria, productos]);

  return (
    <div className="h-screen m-10 flex gap-4 justify-center flex-wrap">
      {lista.map((p) => (
        <Item producto={p}/>
      ))}
    </div>
  );
};
