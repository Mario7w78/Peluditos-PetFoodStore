import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext"; 
import { ProductProvider } from "./context/ProductContext";
import { CategoriesProvider} from "./context/CategoriesContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
       <CategoriesProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CategoriesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
