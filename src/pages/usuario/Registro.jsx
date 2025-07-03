import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "@/styles/Alumno3Styles";
import SuccessPopup from "@/components/popup";


const Registro = ({agregarUsuario}) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNacimiento, setfechaNacimiento] = useState("");
  const [error, setError] = useState("");
  const [dni, setDni] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
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

    const nuevo = agregarUsuario(nuevoUsuario)

    if (nuevo) {
      setSuccessMessage("¡Felicidades! Ya estás registrado/a 🎉");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } else {
      setError("No se pudo loguear, ingrese correctamente sus datos");
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
