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
  const [carrito, setCarrito] = useState([]);
  


  const agregarAlCarrito = (nuevo) => {

    const encontrado = carrito.find(p => p.id === nuevo.id);

    // Si el carrito ya tiene el producto se le aumenta en cantidad
    if (encontrado) {
        setCarrito(carrito.map(producto => (
            producto.id === nuevo.id ?
                { id: producto.id, 
                  nombre: producto.nombre, 
                  precio: producto.precio,
                  cantidad: producto.cantidad+1
                } :
                producto
        )))
    }

    // Si el carrito no tiene el producto lo agrega
    if (!encontrado) setCarrito([...carrito, {  id: nuevo.id, 
                                                nombre: nuevo.name, 
                                                precio: nuevo.yearOfBirth,
                                                cantidad: 1 }]);
    
    Swal.fire({
      icon: "success",
      title: 'Se agrego '+ nuevo.name +' al carrito',
      showConfirmButton: false,
      timer: 1500
    });
  }


  return (
  <div className="d-flex flex-column min-vh-100">
    <Header tipo={tipo} usuario={usuario} />
    <Nav carrito={carrito}/>
    <div className="flex-grow-1 p-3">
      <Routes>
        <Route path="/" element={<Productos agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/productos/:categoria" element={<Productos agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
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
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
    <Footer />
  </div>
  );
}

export default App;
