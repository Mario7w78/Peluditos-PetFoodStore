import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/usuario/Login";
import Registro from "./pages/usuario/Registro";
import Recuperacion from "./pages/usuario/Recuperacion";
import { UserList } from "./pages/usuario/UserList";
import { UserDetail } from "./pages/usuario/UserDetail";
import AddProductForm from "./pages/producto/AddProductForm";
import ProductList from "./pages/producto/ProductList";
import UserProfile from "./pages/usuario/UserProfile";
import Header from "@/components/Header";
import Dashboard from "./pages/usuario/Dashboard";
import Nosotros from "./pages/home/Nosotros";
import Perro from "./pages/categoria/Perro";
import Gato from "./pages/categoria/Gato";
import Hamster from "./pages/categoria/Hamster";
import Buscar from "./pages/producto/Buscar";
import { ProtectedRoutes } from "./pages/usuario/ProtectedRoutes";
import CarritoCompra from "./pages/carrito/CarritoCompra";
import Checkout from "./pages/orden/Checkout";
import PedidoCompleto from "./pages/orden/PedidoCompleto";
import { OrderList } from "./pages/orden/OrderList";
import { OrderDetail } from "./pages/orden/OrderDetail";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorNombre,
  obtenerProductoPorId,
  obtenerProductosPorCategoria,
} from "./data/productos";
import { obtenerCategorias, crearCategoria } from "./data/categorias";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  loginUsuario,
  eliminarUsuario,
  desactivarUsuario,
} from "./data/usuarios";
import {
  crearCarrito,
  obtenerCarritos,
  obtenerCarritoPorUsuario,
  eliminarProductoDelCarrito,
  agregarProductoACarrito,
} from "./data/carrito";
import {
  obtenerOrdenes,
  crearOrdenDesdeCarrito,
  obtenerOrdenesPorUsuario,
  cancelarOrden,
} from "./data/ordenes";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosData, categoriasData, usuariosData, ordenesData] = await Promise.all([
          obtenerProductos(),
          obtenerCategorias(),
          obtenerUsuarios(),
          obtenerOrdenes(),
        ]);
        setProductos(productosData);
        setCategorias(categoriasData);
        setUsuarios(usuariosData)
        setOrdenes(ordenesData)
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const agregarCategoria = async (categoria) => {
    try {
      const nuevaCategoria = await crearCategoria(categoria);
      setCategorias([...categorias, nuevaCategoria]);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const agregarProducto = async (producto) => {
    try {
      const nuevoProducto = await crearProducto(producto);
      setProductos([...productos, nuevoProducto]);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const agregarUsuario = async (usuario) => {
    try {
      const nuevoUsuario = await crearUsuario(usuario);
      setProductos([...usuarios, nuevoUsuario]);
      return nuevoUsuario;
    } catch (error) {
      console.error("Error al agregar usuarios:", error);
    }
  };
  

  const login = async (email, password) => {
    try {
      const usuarioLogueado = await loginUsuario({email, password});
      if (usuarioLogueado) {
        setUser(usuarioLogueado);
        return usuarioLogueado;
      } else {  
        console.error("Credenciales incorrectas");
        return null;  
      }
    } catch (error) { 
      console.error("Error al iniciar sesión:", error);
      return null;
      }
    };

  const ordenesUsuario = async (usuarioId)=>{
    try{
      const orden = await obtenerOrdenesPorUsuario(usuarioId);
      return orden
    }catch(e){
      console.error(e)
    }
    
  }
  const usuarioPorId = async (usuarioId)=>{
    try{
      const usuario = await obtenerUsuarioPorId(usuarioId);
      return usuario
    }catch(e){
      console.error(e)
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login login = {login} />} />
          <Route path="/registro" element={<Registro agregarUsuario={agregarUsuario}/>} />
          <Route path="/recuperacion" element={<Recuperacion />} />
          <Route path="/perfil" element={<UserProfile ordenes={ordenes}/>} />
          <Route path="/carrito" element={<CarritoCompra />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedido" element={<PedidoCompleto />} />
          <Route path="categorias/perro" element={<Perro />} />
          <Route path="categorias/gato" element={<Gato />} />
          <Route path="categorias/hamster" element={<Hamster />} />
          <Route path="buscar" element={<Buscar />} />
          <Route path="nosotros" element={<Nosotros />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/userlist" element={<UserList usuarios={usuarios}  deleteuser={eliminarUsuario} deactivate={desactivarUsuario}  />} />
            <Route path="/dashboard" element={<Dashboard usuarios={usuarios} ordenes={ordenes} productos={productos} deleteuser={eliminarUsuario} deactivate={desactivarUsuario} />} />
            <Route
              path="/agregar-producto"
              element={
                <AddProductForm
                  agregarProducto={agregarProducto}
                  agregarCategoria={agregarCategoria}
                  categorias={categorias}
                />
              }
            />
            <Route path="/userdetail/:id" element={<UserDetail usuarioPorId={usuarioPorId} ordenesUsuario={ordenesUsuario}/>} />
            <Route path="/productos" element={<ProductList />} />
            <Route path="/totalorderlist" element={<OrderList />} />
            <Route path="/orderdetail/:orderId" element={<OrderDetail />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
