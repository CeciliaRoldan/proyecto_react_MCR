import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import Carrito from './components/Carrito';
import Productos from './components/Productos';
import Producto from './components/Producto'
import Admin from './components/Admin';
import RutaProtegida from './components/RutaProtegida';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const usuario = "User";
  const tipo = "Administrador";

  const navItems = ["Inicio", "Productos", "Carrito"];
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [carrito, setCarrito] = useState([]);
  


  //electronics, jewelery
 // Productos Ofertas >>>>>>>>> Administracion Carrito [N]

return (
  <div className="d-flex flex-column min-vh-100">
    <Header tipo={tipo} usuario={usuario} />
    <Nav items={navItems} />
    <div className="flex-grow-1 p-3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/producto/:id" element={<Producto carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/admin" element={
          <RutaProtegida isAuthenticated={isAuthenticated}>
            <Admin />
          </RutaProtegida> } 
        />
        <Route path="/carrito" element={
          <RutaProtegida isAuthenticated={isAuthenticated}>
            <Carrito carrito={carrito} />
          </RutaProtegida> } 
        />
      </Routes>
    </div>
    <Footer />
  </div>
  );
}

export default App;
