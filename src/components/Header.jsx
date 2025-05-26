import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Alumno3Styles";
import Footer from "./Footer";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
 

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };
 
  const irAlPerfil = () => {
    setMenuOpen(false);
    navigate("/perfil");
  };


  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <header className="bg-blue-600 text-white flex items-center justify-between p-4 shadow-md relative">
      <div className="flex items-center gap-2 text-xl font-bold">
        <img src="/LOGO.png" alt="Logo Peluditos" className="h-15 w-15 object-contain" />
        <Link to="/">Peluditos PetFoodStore</Link>
      </div>
      <nav className={styles.navLinks}>
      <Link to="/categorias" className="text-white hover:underline">Categorías</Link>
      <Link to="/productos" className="text-white hover:underline">Productos</Link>
      <Link to="/nosotros" className="text-white hover:underline">Nosotros</Link>
      </nav>

      <div className="flex items-center gap-4 relative" ref={menuRef}>
        <input type="text" placeholder="Buscar..." className={styles.searchInput}/>

        {!user ? (
            <Link to="/login" className={styles.userIcon}>
                👤
            </Link>
            ) : (
            <div className="flex flex-col items-center">
                <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-2xl hover:text-green-600 transition-colors duration-200"
                >
                🧑‍💼
                </button>
                <span className="text-sm text-gray-600 mt-1">{user.nombre}</span>

                {/* Taggle de menu, falta el carrito*/} {/*Se puede linkear a una pagina de /perfil para modificar password o nombre*/}
                {menuOpen && (
                <div className="absolute right-0 top-14 bg-white border rounded-md shadow-md z-50 w-40 text-sm">
                    
                      <button 
                      onClick={irAlPerfil}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100" 
                      >
                    Ver perfil
                      </button>
                    
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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
