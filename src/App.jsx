import React, { useState,useEffect } from 'react';
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
  const renderContenido = () => 
    {
    switch (seccion) {
      case "Inicio":
        return <Home />;
      case "Productos":
        return <ListaProductos carrito={carrito} setCarrito={setCarrito} />;
      case "Joyeria":
        return <></>;
      case "Electronicos":
        return <></>;
      case "Administracion":
        return <Administracion></Administracion>;
      case "Carrito":
        return <Carrito carrito={carrito} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header tipo={tipo} usuario={usuario} />
      <Nav items={navItems} onSeleccion={setSeccion} />
      <main className="flex-grow-1 p-3">
        {renderContenido()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
