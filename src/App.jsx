import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import Carrito from './components/Carrito';
import ListaProductos from './components/ListaProductos';
import Administracion from './components/Administracion';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const usuario = "User";
  const tipo = "Administrador";

  const navItems = ["Inicio", "Productos", "Carrito"];

  const [seccion, setSeccion] = useState("Inicio");
  const [carrito, setCarrito] = useState([]);

  //electronics, jewelery
 // Productos Ofertas >>>>>>>>> Administracion Carrito [N]

return (
  <div className="d-flex flex-column min-vh-100">
      <Header tipo={tipo} usuario={usuario} />
      <Nav items={navItems} onSeleccion={setSeccion} />
      <div className="flex-grow-1 p-3">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ListaProductos carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/administracion" element={<Administracion/>} />
        <Route path="/carrito" element={<Carrito carrito={carrito} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
