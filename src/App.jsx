import React from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="recuperacion" element={<Recuperacion />} />
        <Route path="userlist" element={<UserList />} />
        <Route path="userdetail/:id" element={<UserDetail />} />
        <Route path="agregar-producto" element={<AddProductForm />} />
        <Route path="productos" element={<ProductList />} />
        <Route path="perfil" element={<UserProfile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="categorias/perro" element={<Perro />} />
        <Route path="categorias/gato" element={<Gato />} />
        <Route path="categorias/hamster" element={<Hamster />} />
        <Route path="buscar" element={<Buscar />} />
        <Route path="producto/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;