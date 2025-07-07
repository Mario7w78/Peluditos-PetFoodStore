import { Title } from "@/components/Title";
import { OrderTable } from "@/components/OrderTable";
import { Link } from "react-router-dom";
import { useState } from "react";

export const OrderList = ({ordenes}) => {
  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <Title text="Lista de Órdenes" />
        <input
          onChange={""}
          type="text"
          placeholder="Buscar por ID de orden, usuario o producto"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <OrderTable ordenes={ordenes} />
        <Link
            to="/dashboard"
            className="text-blue-700 hover:font-bold border my-3 rounded-2xl p-2 hover:border-2"
          >
            Volver al Dashboard
        </Link>
      </div>

      
    </>
  );
};
