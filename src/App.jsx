import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Recuperacion from "./pages/Recuperacion";
import { UserList } from "./pages/UserList";
import { UserDetail } from "./pages/UserDetail";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperacion" element={<Recuperacion />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/userdetail/:id" element={<UserDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
