import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import styles from "@/styles/Alumno3Styles";
import Footer from "./Footer";


const Header = ({ categorias }) => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const irAlPerfil = () => {
    setMenuOpen(false);
    navigate("/perfil");
  };

  const handleBuscar = (e) => {
    if (e.key === "Enter" && busqueda.trim()) {
      navigate(`/productos?busqueda=${busqueda}`);
      setBusqueda("");
    } else {
      if (!busqueda.trim()) {
        navigate(`/productos`);
      }
    }
  };

  //Cambiar mas adelante la dirección
  const irListaOrdenes = () => {
    setMenuOpen(false);
    navigate("/");
  };

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setMostrarCategorias(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white flex items-center justify-between p-4 shadow-md relative"
        ref={menuRef}
      >
        <div className="flex items-center gap-2 text-xl font-bold">
          <img
            src="/LOGO.png"
            alt="Logo Peluditos"
            className="h-15 w-15 object-contain rounded-full"
          />
          <Link to="/">Peluditos PetFoodStore</Link>
        </div>

        {user?.admin && (
          <details className="ml-4 text-white">
            <summary className="cursor-pointer hover:underline">
              Opciones de admin
            </summary>
            <div className="mt-2 flex flex-col bg-white text-black rounded shadow-md absolute z-50 w-48">
              <Link
                to="/agregar-producto"
                className="px-4 py-2 hover:bg-gray-100"
              >
                Agregar Producto
              </Link>
              <Link
                to="/agregar-categoria"
                className="px-4 py-2 hover:bg-gray-100"
              >
                Agregar Categoría
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                to="/userlist"
                className="px-4 py-2 hover:bg-gray-100"
              >
                Lista de usuarios
              </Link>
              <Link
                to="/totalorderlist"
                className="px-4 py-2 hover:bg-gray-100"
              >
                Lista de ordenes
              </Link>
            </div>
          </details>
        )}
        <nav className={`${styles.navLinks} relative flex gap-4`}>
          <div className="relative">
            <button
              onClick={() => setMostrarCategorias(!mostrarCategorias)}
              className="text-white hover:underline flex items-center gap-1"
            >
              Categorías{" "}
              <span className="text-xs">{mostrarCategorias ? "▲" : "▼"}</span>
            </button>

            {mostrarCategorias && (
              <div className="absolute bg-white text-black mt-2 shadow-md rounded z-50 w-40 flex flex-col">
                {categorias.map((c) => (
                  <Link
                    to={`/productos?categoria=${c.id}`}
                    onClick={() => setMostrarCategorias(false)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    {c.nombre}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/productos" className="text-white hover:underline">
            Productos
          </Link>
          <Link to="/nosotros" className="text-white hover:underline">
            Nosotros
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={handleBuscar}
          />

          <button
            onClick={() => navigate("/carrito")}
            className="text-2xl hover:text-yellow-300 transition-colors duration-200"
            title="Ver carrito"
          >
            🛒
          </button>

          {!user ? (
            <Link to="/login" className={styles.userIcon}>
              👤
            </Link>
          ) : (
            <div className="flex flex-col items-center relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-2xl hover:text-green-600 transition-colors duration-200"
              >
                👤
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-10 bg-white border rounded-md shadow-md z-50 w-40 text-sm">
                  <button
                    onClick={irAlPerfil}
                    className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                  >
                    Mi Cuenta
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <Outlet />
      <Footer />
    </>
  );
};

export default Header;
