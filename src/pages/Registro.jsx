import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
//import styles from '../styles/registro.css';

const Registro = () => {
  const { register } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    // Nuevo usuario creado como objeto
    const nuevoUsuario = { nombre, email, password };

    const { success, message } = register(nuevoUsuario);
    if (success) {
      // redireccion al login  
      navigate('/login');
    } else {
      setError(message);
    }
  };

  /* 
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Registro</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required/>
        <input type='date' placeholder="Fecha de Nacimiento" value={age} onChange={e => setAge(e.target.value)} required />
        <button type="submit">Registrarse</button>
        <Link to="/login">Ya tengo cuenta</Link>
      </form>
    </div>
  );
  */

  //Colocar un header de boton para vovler a la pagina principal.
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registro</h2>
        {error && <p>{error}</p>}
        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required/>
        <input type='date' placeholder="Fecha de Nacimiento" value={age} onChange={e => setAge(e.target.value)} required />
        <button type="submit">Registrarse</button>
        <Link to="/login">Ya tengo cuenta</Link>
      </form>
    </div>
  );


};

export default Registro;
