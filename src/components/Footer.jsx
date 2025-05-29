import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [mostrarContacto, setMostrarContacto] = useState(false);
  const [mostrarPeluditos, setMostrarPeluditos] = useState(false);

  return (
    <footer className="bg-blue-600 text-white border-t">
      
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 text-sm items-start">

        <div className="md:pr-6">
          <button
            onClick={() => setMostrarPeluditos(!mostrarPeluditos)}
            className="w-full flex items-center justify-between py-2 text-left font-semibold"
          >
            <span>Peluditos PetFoodStore</span>
            <span className="text-lg">{mostrarPeluditos ? "▲" : "▼"}</span>
          </button>

          {mostrarPeluditos && (
            <div className="mt-2 space-y-1 text-sm">
              <Link to="/nosotros" className="underline hover:text-gray-200 block">
                Nosotros
              </Link>
            </div>
          )}
        </div>

        <div className="md:pl-6 border-t md:border-t-0 md:border-l border-white/40">
          <button
            onClick={() => setMostrarContacto(!mostrarContacto)}
            className="w-full flex items-center justify-between py-2 text-left font-semibold md:pl-6"
          >
            <span>Contacto</span>
            <span className="text-lg">{mostrarContacto ? "▲" : "▼"}</span>
          </button>

          {mostrarContacto && (
            <div className="mt-2 space-y-1 text-sm md:pl-6">
              <p>Email: contacto@peluditos.com</p>
              <p>Tel: +51 987 654 321</p>
              <p>WhatsApp: +51 993 703 333</p>
              <p>Servicio de atención:</p>
              <p>Lunes a sábados: 8am - 9pm</p>
              <p>Domingo: 8am - 8pm</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-white py-4 border-t border-white/30 text-xs">
        © 2025 Peluditos Pet Food Store. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
