import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useOrderContext } from "../context/orderContext";
import { useProductContext } from "../context/ProductContext";
import { OrderTable } from "../components/OrderTable";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { usuarios, deactivate, deleteuser } = useContext(AuthContext);
  const { ordenes } = useOrderContext();
  const { productos } = useProductContext();
  const [selectedUser, setSelectedUser] = useState(usuarios[0]);
  // Resumen
  const totalOrdenes = ordenes.length;
  const totalUsuarios = usuarios.length;
  const totalIngresos = ordenes.reduce((acc, orden) => acc + orden.total, 0);
  const handleDeactivate = (usuario) => {
    if (usuario.admin) {
      alert("No puedes desactivar a un administrador");
      return;
    }
    deactivate(usuario.id);
  };

  const handleDelete = (usuario) => {
    if (usuario.admin) {
      alert("No puedes eliminar a un administrador");
      return;
    }
    deleteuser(usuario.id);
  };

  const ordenesUsuario = ordenes.filter(
    (ord) => ord.usuarioid === selectedUser?.id
  );

  return (
    <div className="p-8 bg-[#fafbfc] min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-[#222]">Dashboard</h1>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="flex-1 bg-[#ff7e5a] text-white rounded-xl p-6 shadow text-center">
          <span>Órdenes</span>
          <h2 className="text-4xl font-bold">{totalOrdenes}</h2>
        </div>
        <div className="flex-1 bg-[#ff7e5a] text-white rounded-xl p-6 shadow text-center">
          <span>Usuarios nuevos</span>
          <h2 className="text-4xl font-bold">{totalUsuarios}</h2>
        </div>
        <div className="flex-1 bg-[#ff7e5a] text-white rounded-xl p-6 shadow text-center">
          <span>Ingresos totales</span>
          <h2 className="text-4xl font-bold">S/{totalIngresos.toFixed(2)}</h2>
        </div>
      </div>

      {/* Zona principal: tabla de usuarios + detalle */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Usuarios */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg">Usuarios registrados</span>
            <Link
              to="/userlist"
              className="bg-[#ff7e5a] text-white rounded-md px-4 py-2 font-semibold hover:bg-[#ff5a36]"
            >
              Ver todos los usuarios
            </Link>
          </div>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr>
                <th className="text-left py-2">Nombre</th>
                <th className="text-left py-2">Estado</th>
                <th className="text-left py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.slice(0, 5).map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2 flex items-center gap-2">
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    {user.nombre}
                  </td>
                  <td className="py-2">
                    <span
                      className={
                        user.canlogin
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {user.canlogin ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="py-2 flex gap-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="border border-[#ff7e5a] text-[#ff7e5a] font-semibold px-3 py-1 rounded hover:bg-[#ff7e5a] hover:text-white transition"
                    >
                      Ver detalle
                    </button>
                    <button onClick={()=>handleDeactivate(user)} className="border border-[#ff7e5a] text-[#ff7e5a] font-semibold px-3 py-1 rounded hover:bg-[#ff7e5a] hover:text-white transition">
                      Desactivar
                    </button>
                    <button onClick={()=>handleDelete(user)} className="border border-[#ff7e5a] text-[#ff7e5a] font-semibold px-3 py-1 rounded hover:bg-[#ff7e5a] hover:text-white transition">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detalle de usuario */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow">
          <span className="font-semibold text-lg mb-2 block">
            Detalle del usuario
          </span>
          {selectedUser ? (
            <div className="bg-[#f8f8f8] rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <b>{selectedUser.nombre}</b>
                  <div className="text-gray-500 text-sm">
                    Correo: {selectedUser.email}
                  </div>
                  <div>Rol: {selectedUser.rol}</div>
                  <div>
                    Estado:{" "}
                    <span
                      className={
                        selectedUser.canlogin
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {selectedUser.canlogin ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>
                <img
                  src={selectedUser.avatar || "/default-avatar.png"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#ff7e5a]"
                />
              </div>

              <table className="w-full border-collapse mt-2">
                <thead>
                  <tr>
                    <th className="text-left py-1">ID</th>
                    <th className="text-left py-1">Fecha</th>
                    <th className="text-left py-1">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenesUsuario.slice(0, 10).map((ord) => (
                    <tr key={ord.id} className="border-b">
                      <td className="py-1 text-[#ff7e5a] font-semibold">
                        {ord.id}
                      </td>
                      <td className="py-1">{ord.fecha}</td>
                      <td className="py-1">S/{ord.total}.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">
              Selecciona un usuario para ver su detalle.
            </p>
          )}
        </div>
      </div>

      {/* Tabla de órdenes */}
      <div className="bg-white rounded-xl p-6 shadow">
        <span className="font-semibold text-lg">Listado de órdenes</span>
        <OrderTable ordenes={ordenes.slice(0, 5)} mostrarAcciones={false} />
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => navigate("/tabla")}
            className="border border-[#ff7e5a] text-[#ff7e5a] font-semibold px-4 py-2 rounded hover:bg-[#ff7e5a] hover:text-white transition"
          >
            Ver productos
          </button>
          <Link
            to="/totalorderlist"
            className="border border-[#ff7e5a] text-[#ff7e5a] font-semibold px-4 py-2 rounded hover:bg-[#ff7e5a] hover:text-white transition"
          >
            Ver todas las órdenes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
