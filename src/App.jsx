import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Recuperacion from "./pages/Recuperacion";
import { UserList } from "./pages/UserList";



function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/recuperacion" element={<Recuperacion/>} />


        <Route path="/userList" element={<UserList/>} />
      </Routes>
    </>
    
  );
}

export default App;
