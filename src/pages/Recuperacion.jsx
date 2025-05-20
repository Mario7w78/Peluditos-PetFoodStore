import React, { useState } from 'react';
//import styles from '../styles/recuperacion.css';

const Recuperacion = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje('Si el correo es válido, recibirás un enlace para restablecer tu contraseña.');
  };

  /*
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Recuperar Contraseña</h2>
        {mensaje && <p className={styles.success}>{mensaje}</p>}
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit">Enviar enlace</button>
      </form>
    </div>
  ); */
  return (
    <div >
      <form onSubmit={handleSubmit} >
        <h2>Recuperar Contraseña</h2>
        {mensaje && <p>{mensaje}</p>}
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit">Enviar enlace</button>
      </form>
    </div>
  );

};

export default Recuperacion;
