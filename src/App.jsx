import React from "react";
import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Recuperacion from "./pages/Recuperacion";
import { UserList } from "./pages/UserList";
import { UserDetail } from "./pages/UserDetail";
import AddProductForm from "./pages/AddProductForm";
import ProductList from "./pages/ProductList";
import UserProfile from "./pages/UserProfile"; // Asegúrate de que la ruta sea correcta


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/recuperacion" element={<Recuperacion/>} />
        <Route path="/agregar-producto" element={<AddProductForm />} />
        <Route path="/productos" element={<ProductList />} />
        <Route path="/userlist" element={<UserList/>} />
        <Route path="/userdetail/:id" element={<UserDetail/>} />
        <Route path="/perfil" element={<UserProfile />} />
      </Routes>
    </>
    
  );
}

export default App;
