import { MasVendido } from "@/components/MasVendido";

function Home({AgregarAlCarrito}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center text-center p-8 bg-gray-50">
      
        <h1 className="text-5xl font-extrabold mb-6 text-purple-700">
          Bienvenido a Peluditos Pet Food Store
        </h1>
        <p className="text-xl text-black mb-15">
          Tu tienda de confianza para consentir a tus mascotas
        </p>
        <h2 className="text-4xl font-bold text-purple-700">
          ¡Lo más vendido!
        </h2>
        <MasVendido AgregarAlCarrito={AgregarAlCarrito} />


      </main>
    </div>
  );
}

export default Home;
