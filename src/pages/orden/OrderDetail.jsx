import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Title } from "@/components/Title";
import styles from "@/styles/Alumno3Styles";

export const OrderDetail = ({ordenesPorId, cancelarOrdenPorId}) => {
  const { orderId } = useParams();
  const [orden, setOrden] = useState([])
  useEffect(() => {
      const fetchData = async () => {
        try {
          const ordenes = await ordenesPorId(orderId);
          setOrden(ordenes);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
  
      fetchData();
    }, [orderId]);

  const handleEliminar = () => {
    if (window.confirm("¿Estás seguro de eliminar esta orden?")) {
      eliminarOrden(orden.id);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <Title text="Detalle de la Orden" />
      {orden ? (
        <div className="border-2 border-blue-500 p-4 [&_strong]:text-blue-700 rounded-lg w-3/4">
          <p><strong>ID de Orden:</strong> {orden.id}</p>
          <p><strong>Fecha:</strong> {orden.fecha}</p>
          <p><strong>Nombre de Usuario:</strong> {orden.usuarioid}</p>
          <p><strong>Productos:</strong></p>
          <ul>
            {orden.productos?.map((producto, index) => (
              <li key={index}><img className="w-20 inline" src={producto.imgurl} alt="" /> {producto.nombre} - Cantidad: {producto.cantidad} - Precio: S/.{producto.DetalleOrden.subtotal}</li>
            ))}
          </ul>
        <p><strong>Total:</strong> ${orden.total}</p>
        <button onClick={()=>cancelarOrdenPorId(orden.id)} className={styles.button+" my-2"}>Cancelar orden</button>
        </div>
        

      ) : (
        <p>No se encontró la orden.</p>
      )}
      <Link
          className="text-blue-700 hover:font-bold border my-3 rounded-2xl p-2 hover:border-2"
          to="/totalorderlist"
        >
          Volver a la lista de ordenes
        </Link>
    </div>
  );
};
