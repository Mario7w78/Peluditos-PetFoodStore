import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Alumno3Styles";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-gray-50">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Bienvenido a Peluditos Pet Food Store 🐶🐱
        </h1>
        <p className="text-gray-600 mb-6">
          Tu tienda de confianza para consentir a tus mascotas.
        </p>
      </main>
      
      <Footer />
    </div>

  );
}

export default Home;