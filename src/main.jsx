import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductosProvider } from './context/ProductosContext.jsx';
import { BusquedaProvider } from './context/BusquedaContext.jsx';
import { HelmetProvider } from "react-helmet-async";
import ReactDOM from 'react-dom/client';
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <ProductosProvider>
          <CarritoProvider>
            <AuthProvider>
              <BusquedaProvider>
                <App /> 
              </BusquedaProvider>
            </AuthProvider>
          </CarritoProvider>
        </ProductosProvider>
      </Router>
    </HelmetProvider>
  </StrictMode>
);
