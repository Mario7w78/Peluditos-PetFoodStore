import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { ContextProvider } from "./context/orderContext";
import { ProductProvider } from "./context/ProductContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { CartProvider } from "./context/CartContext";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <CategoriesProvider>
      <ProductProvider>
        <CartProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
        </CartProvider>
      </ProductProvider>
    </CategoriesProvider>
  </AuthProvider>
</BrowserRouter>
);
