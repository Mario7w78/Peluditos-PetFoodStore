import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Alumno3Styles";
import SuccessPopup from "../components/popup";
import { v4 as uuidv4 } from "uuid";

const Registro = () => {
  const { register } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [dni, setDni] = useState("");
  const [admin, setAdmin] = useState(false);
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
      id: uuidv4(),
      nombre,
      email,
      dni,
      age,
      password,
      rol: "cliente", // ✅ Cliente por defecto
    };

    const { success, message } = register(nuevoUsuario);

    if (success) {
      setSuccessMessage("¡Felicidades! Ya estás registrado/a 🎉");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } else {
      setError(message);
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
                value={age}
                onChange={(e) => setAge(e.target.value)}
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
