import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/Alumno3Styles';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  //El error estaba en que las className se usan :""
  return (
    
    <div className="min-h-screen flex flex-col">   
    <Header />

    <main className="flex-grow">
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form} >
          <h2 className="text-2xl font-semibold mb-6">Iniciar Sesión</h2>
          {error && <p className={styles.error}>{error}</p>}
          <input type="email" className={styles.input}
          placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password" className={styles.input}
          placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}/>
          <button type="submit" className={styles.button} >Iniciar Sesión</button>
          <Link className={styles.link} to="/registro">¿No tienes cuenta? Regístrate</Link>
          <Link className={styles.link} to="/recuperacion">Olvidé mi contraseña</Link>
        </form>
      </div>
    </main>

    <Footer />
    </div> 
  );

};

export default Login;