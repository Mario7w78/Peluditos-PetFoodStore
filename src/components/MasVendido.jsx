import { Item } from "@/pages/producto/Item";
import { obtenerProductosMasVendidos } from "@/data/productos";
import { useEffect, useState } from "react";

export const MasVendido = ({ producto = 0, AgregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const masvendidos = await obtenerProductosMasVendidos();
        setProductos(masvendidos);
      } catch (error) {
        console.error("Error al obtener productos más vendidos:", error);
      }
    };
    obtenerProductos();
  }, []);

  if (!productos.length) {
    return <p>No hay productos más vendidos disponibles.</p>;
  }

  return (
    <div className="m-10 flex gap-4 justify-center">
      {productos.map((p) => (
        <Item key={p.id} producto={p} AgregarAlCarrito={AgregarAlCarrito} />
      ))}
    </div>
  );
};
