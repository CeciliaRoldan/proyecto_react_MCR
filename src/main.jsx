import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductosProvider } from './context/ProductosContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BusquedaProvider } from './context/BusquedaContext.jsx';
import { Helmet, HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
