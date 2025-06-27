import React, { useState } from "react";

const Nosotros = () => {
  const [verMas, setVerMas] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10 text-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          Sobre Nosotros
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          En <strong>Peluditos Pet Food Store</strong>, tienda virtual para mascotas, nos especializamos en ofrecer productos alimenticios de alta calidad para perros y gatos.
        </p>

        {verMas && (
          <div className="text-gray-700 text-lg space-y-4 mb-4">
            <p>
              Nuestro principal objetivo es brindar todo lo que una mascota necesita para ser feliz. Desde las mejores marcas de alimentos para asegurar su bienestar y prolongar su vida.
            </p>
            <p>
              Llegamos a Lima, Arequipa, Trujillo, Chiclayo y Piura con diferentes modalidades de delivery. <strong>Delivery regular:</strong> Gratis por compras 
              mayores a S/90. <strong>Delivery express:</strong> Recibe tu pedido en menos de 2 horas pagando solo S/10.
            </p>
            <p>
              Queremos que puedas darle el mejor cuidado y atención a tu mascota por eso trabajamos con las mejores marcas de alimento para tu perro y gato. Podrás encontrar sus marcas favoritas 
              como Canbo, Hills, Pro Plan, Dogxtreme, Royal Canin y muchas más.
            </p>
          </div>
        )}

        <button
          onClick={() => setVerMas(!verMas)}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          {verMas ? "ver menos" : "ver más"}
        </button>
      </div>
    </div>
  );
};

export default Nosotros;