import React, { useState } from 'react';
import '../Dashboard.css';
import { useNavigate } from 'react-router-dom';

const usuariosDemo = [
  { id: 1, nombre: 'Juan Perez', estado: 'Activo', email: 'juan.perez@gmail.com', fecha: '20/01/2025', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, nombre: 'Mario Gonzales', estado: 'Activo', email: 'mario.gonzales@gmail.com', fecha: '18/01/2025', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { id: 3, nombre: 'Marco Aurelio', estado: 'Activo', email: 'marco.aurelio@gmail.com', fecha: '15/01/2025', avatar: 'https://randomuser.me/api/portraits/men/34.jpg' },
  { id: 4, nombre: 'Ana Díaz', estado: 'Activo', email: 'ana.diaz@gmail.com', fecha: '10/01/2025', avatar: 'https://randomuser.me/api/portraits/women/35.jpg' },
  { id: 5, nombre: 'Carlos Lopez', estado: 'Activo', email: 'carlos.lopez@gmail.com', fecha: '09/01/2025', avatar: 'https://randomuser.me/api/portraits/men/36.jpg' },
  { id: 6, nombre: 'Laura Méndez', estado: 'Activo', email: 'laura.mendez@gmail.com', fecha: '07/01/2025', avatar: 'https://randomuser.me/api/portraits/women/37.jpg' },
  { id: 7, nombre: 'Alejandro Ruiz', estado: 'Inactivo', email: 'alejandro.ruiz@gmail.com', fecha: '05/01/2025', avatar: 'https://randomuser.me/api/portraits/men/38.jpg' },
];

const ordenesDemo = [
  { id: '#1234', usuario: 'Alejandro Ruiz', fecha: '20/01/2025', total: 199, estado: 'Entregado' },
  { id: '#1234', usuario: 'Alejandro Ruiz', fecha: '20/01/2025', total: 199, estado: 'Entregado' },
  { id: '#1234', usuario: 'Alejandro Ruiz', fecha: '20/01/2025', total: 199, estado: 'Entregado' },
  { id: '#1234', usuario: 'Alejandro Ruiz', fecha: '20/01/2025', total: 199, estado: 'Entregado' },
];

const ordenesUsuario = [
  { id: '#1234', fecha: '20/01/2025', total: 199 },
  { id: '#1235', fecha: '19/01/2025', total: 178 },
  { id: '#1236', fecha: '18/01/2025', total: 210 },
  { id: '#1237', fecha: '16/01/2025', total: 320 },
  { id: '#1238', fecha: '14/01/2025', total: 150 },
  { id: '#1239', fecha: '12/01/2025', total: 320 },
];

export default function Dashboard() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(usuariosDemo[0]);
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <span>Órdenes</span>
          <h2>68</h2>
        </div>
        <div className="dashboard-card">
          <span>Usuarios nuevos</span>
          <h2>12</h2>
        </div>
        <div className="dashboard-card">
          <span>Ingresos totales</span>
          <h2>S/2348.00</h2>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-users">
          <div className="dashboard-users-header">
            <span>Usuarios registrados</span>
            <button className="btn-ver-todos">Ver todos los usuarios</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosDemo.map(user => (
                <tr key={user.id}>
                  <td>
                    <img src={user.avatar} alt={user.nombre} className="avatar" />
                    {user.nombre}
                  </td>
                  <td>
                    <span className={user.estado === 'Activo' ? 'estado-activo' : 'estado-inactivo'}>
                      {user.estado}
                    </span>
                  </td>
                  <td>
                    <button className="btn-dashboard" onClick={() => setUsuarioSeleccionado(user)}>Ver detalle</button>
                    <button className="btn-dashboard">Desactivar</button>
                    <button className="btn-dashboard">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="dashboard-pagination">
            <button>&lt;</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>10</button>
            <button>&gt;</button>
          </div>
        </div>
        <div className="dashboard-user-detail">
          <span className="detalle-title">Detalle del usuario</span>
          <div className="detalle-user-card">
            <div className="detalle-user-header">
              <div>
                <b>{usuarioSeleccionado.nombre}</b>
                <div className="detalle-user-email">Correo: {usuarioSeleccionado.email}</div>
                <div>Fecha de registro: {usuarioSeleccionado.fecha}</div>
                <div>Estado: <span className={usuarioSeleccionado.estado === 'Activo' ? 'estado-activo' : 'estado-inactivo'}>{usuarioSeleccionado.estado}</span></div>
              </div>
              <img src={usuarioSeleccionado.avatar} alt={usuarioSeleccionado.nombre} className="avatar-grande" />
            </div>
            <table className="detalle-ordenes-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {ordenesUsuario.map(ord => (
                  <tr key={ord.id}>
                    <td className="detalle-orden-id">{ord.id}</td>
                    <td>{ord.fecha}</td>
                    <td>S/{ord.total}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dashboard-pagination">
            <button>&lt;</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>10</button>
            <button>&gt;</button>
          </div>
        </div>
      </div>

      <div className="dashboard-orders">
        <span>Listado de órdenes</span>
        <table>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Usuario</th>
              <th>Fecha de órden</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ordenesDemo.map((ord, idx) => (
              <tr key={idx}>
                <td className="detalle-orden-id">{ord.id}</td>
                <td>{ord.usuario}</td>
                <td>{ord.fecha}</td>
                <td>S/{ord.total}.00</td>
                <td className="estado-entregado">Entregado</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="dashboard-pagination">
          <button>&lt;</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <span>...</span>
          <button>10</button>
          <button>&gt;</button>
        </div>
        <div className="dashboard-orders-actions">
          <button className="btn-dashboard" onClick={() => navigate('/tabla')}>Ver productos</button>
          <button className="btn-dashboard">Ver todas las órdenes</button>
        </div>
      </div>
    </div>
  );
}
