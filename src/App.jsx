import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Recuperacion from "./pages/Recuperacion";



function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/recuperacion" element={<Recuperacion/>} />
      </Routes>
    </>
    
  );
}

export default App;
