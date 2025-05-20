import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Peluditos Pet Food Store</h1>
      <Link to="/login">
        <button>Ingresar Usuario</button>
      </Link>
    </div>
  );
}

export default Home;