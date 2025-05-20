import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

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
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Iniciar Sesión</button>
        <Link className="enlace" to="/registro">¿No tienes cuenta? Regístrate</Link>
        <Link className="enlace" to="/recuperacion">Olvidé mi contraseña</Link>
      </form>
    </div>
  );

};

export default Login;