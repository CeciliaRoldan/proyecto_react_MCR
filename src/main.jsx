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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <ProductosProvider>
        <CarritoProvider>
          <AuthProvider>
            <App /> 
          </AuthProvider>
        </CarritoProvider>
      </ProductosProvider>
    </Router>
  </React.StrictMode>
);
