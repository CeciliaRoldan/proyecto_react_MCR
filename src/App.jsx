import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import Carrito from './components/Carrito';
import Productos from './components/Productos';
import DetalleProducto from './components/DetalleProducto'
import Admin from './components/Admin';
import RutaProtegida from './components/RutaProtegida';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {

  const usuario = "User";
  const tipo = "Administrador";

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
  <div className="d-flex flex-column min-vh-100">
    <Header tipo={tipo} usuario={usuario} />
    <Nav/>
    <div className="flex-grow-1 p-3">
      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/productos/:categoria" element={<Productos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/admin" element={
          <RutaProtegida isAuthenticated={isAuthenticated}>
            <Admin />
          </RutaProtegida> } 
        />
        <Route path="/carrito" element={
          <RutaProtegida isAuthenticated={isAuthenticated}>
            <Carrito />
          </RutaProtegida> } 
        />
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
    <Footer />
  </div>
  );
}

export default App;
