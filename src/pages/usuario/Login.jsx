import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "@/styles/Alumno3Styles";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      setLoginSuccess(true);
    } else {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  useEffect(() => {
    if (loginSuccess && user) {
      if (user.admin) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [loginSuccess, user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className="text-2xl font-semibold mb-6">Iniciar Sesión</h2>

            {error && <p className={styles.error}>{error}</p>}

            <input
              type="email"
              className={styles.input}
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <button type="submit" className={styles.button}>
              Iniciar Sesión
            </button>

            <Link className={styles.link} to="/registro">
              ¿No tienes cuenta? Regístrate
            </Link>
            <Link className={styles.link} to="/recuperacion">
              Olvidé mi contraseña
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
