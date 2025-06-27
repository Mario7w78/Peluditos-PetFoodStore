import {Routes, Route } from "react-router-dom";
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


function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperacion" element={<Recuperacion />} />
          <Route path="/perfil" element={<UserProfile />} />
          <Route path="/carrito" element={<CarritoCompra/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/pedido" element={<PedidoCompleto/>}/>
          <Route path="categorias/perro" element={<Perro />} />
          <Route path="categorias/gato" element={<Gato />} />
          <Route path="categorias/hamster" element={<Hamster />} />
          <Route path="buscar" element={<Buscar />} />
          <Route path="nosotros" element={<Nosotros />} />
          
          <Route element={<ProtectedRoutes/>}>
            <Route path="/userlist" element={<UserList />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/agregar-producto" element={<AddProductForm />} />
            <Route path="/userdetail/:id" element={<UserDetail />} />
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
