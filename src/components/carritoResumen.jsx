// components/carritoResumen.jsx
import React from "react";
import { Link } from "react-router-dom";

const CarritoResumen = ({ total, cantidadProductos }) => {
  return (
    <div className="w-1/3 bg-gray-100 p-6 m-9 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Resumen de la compra</h2>
      <p>
        <strong>Productos:</strong> {cantidadProductos || 0}
      </p>
      <p>
        <strong>Total:</strong> S/.{total.toFixed(2)}
      </p>
    </div>
  );
};

export default CarritoResumen;
