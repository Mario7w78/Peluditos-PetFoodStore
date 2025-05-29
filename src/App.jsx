import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Recuperacion from "./pages/Recuperacion";
import { UserList } from "./pages/UserList";
import { UserDetail } from "./pages/UserDetail";
import AddProductForm from "./pages/AddProductForm";
import ProductList from "./pages/ProductList";
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Nosotros from "./pages/Nosotros";
import Perro from "./pages/Perro";
import Gato from "./pages/Gato";
import Hamster from "./pages/Hamster";
import Buscar from "./pages/Buscar";
import ProductDetail from "./pages/ProductDetail";
import {ProtectedRoutes} from "./pages/ProtectedRoutes";
import CarritoCompra from "./pages/CarritoCompra";
import Checkout from "./pages/Checkout";
import PedidoCompleto from "./pages/PedidoCompleto";
import { OrderList } from "./pages/OrderList";

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
          </Route>

        </Route>
      </Routes>
    </>
  );
}

export default App;
