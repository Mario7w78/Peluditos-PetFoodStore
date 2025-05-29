import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { ContextProvider } from "./context/orderContext";
import { ProductProvider } from "./context/ProductContext";
import { CategoriesProvider } from "./context/CategoriesContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <CategoriesProvider>
      <ProductProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </ProductProvider>
    </CategoriesProvider>
  </AuthProvider>
</BrowserRouter>
);
