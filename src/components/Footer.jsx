import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Peluditos</h3>
          <p>Alimentos y accesorios para tus mascotas con amor y calidad.</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Enlaces útiles</h3>
          <ul className="space-y-1">
            <li><Link to="#" className="hover:underline">Categorías</Link></li>
            <li><Link to="#" className="hover:underline">Productos</Link></li>
            <li><Link to="#" className="hover:underline">Soporte</Link></li>
            <li><Link to="#" className="hover:underline">Términos y condiciones</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Contacto</h3>
          <p>Email: contacto@peluditos.com</p>
          <p>Tel: +51 987 654 321</p>
          <div className="flex gap-3 mt-2 text-lg">
            <a href="#" className="hover:text-blue-600">🐦</a>
            <a href="#" className="hover:text-blue-600">📘</a>
            <a href="#" className="hover:text-blue-600">📸</a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 py-4 border-t text-xs">
        © 2025 Peluditos Pet Food Store. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
