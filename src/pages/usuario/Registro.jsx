import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "@/styles/Alumno3Styles";
import SuccessPopup from "@/components/popup";
import { API_URL } from "@/data/config";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNacimiento, setfechaNacimiento] = useState("");
  const [error, setError] = useState("");
  const [dni, setDni] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!/^\d{8}$/.test(dni)) {
      setError("El DNI debe tener exactamente 8 dígitos numéricos.");
      return;
    }

    const nuevoUsuario = {
      nombre,
      email,
      dni,
      fechaNacimiento,
      password,
      rol: "cliente",
    };

    try {
      const res = await fetch(`${API_URL}/usuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (res.ok) {
        setSuccessMessage("¡Felicidades! Ya estás registrado/a 🎉");
        setError("");
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        setError("No se pudo registrar, ingrese correctamente sus datos");
      }
    } catch (error) {
      setError("Error de red o servidor");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className={styles.container}>
          <SuccessPopup message={successMessage} />
          {!successMessage && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className="text-xl font-semibold mb-4">Registro</h2>

              {error && <p className={styles.error}>{error}</p>}

              <input
                type="text"
                className={styles.input}
                placeholder="Nombre del usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <input
                type="email"
                className={styles.input}
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                className={styles.input}
                placeholder="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
              <input
                type="password"
                className={styles.input}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className={styles.input}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <input
                type="date"
                className={styles.input}
                placeholder="Fecha de nacimiento"
                value={fechaNacimiento}
                onChange={(e) => setfechaNacimiento(e.target.value)}
                required
              />

              <button type="submit" className={styles.button}>
                Registrarse
              </button>

              <Link to="/login" className={styles.link}>
                Ya tengo cuenta
              </Link>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default Registro;
