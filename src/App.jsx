import React from "react";
import { Link, Routes, Route } from "react-router-dom";
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



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperacion" element={<Recuperacion />} />
          <Route path="/carrito" element={<CarritoCompra/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/pedido" element={<PedidoCompleto/>}/>
          <Route path="/userlist" element={<UserList />} />
          <Route path="/userdetail/:id" element={<UserDetail />} />
          <Route path="/agregar-producto" element={<AddProductForm />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/perfil" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
