import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "@/styles/Alumno3Styles";
import Popup from "@/components/popup";

const Recuperacion = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje(
      "Si el correo es válido, recibirás un enlace para restablecer tu contraseña. 🔍"
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.heading}>Recuperar Contraseña</h2>
            <Popup message={mensaje} />
            <input
              type="email"
              className={styles.input}
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className={styles.button}>
              Enviar enlace
            </button>
            <Link to="/login" className={styles.link}>
              Volver al inicio de sesión
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Recuperacion;
