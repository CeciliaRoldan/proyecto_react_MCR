import React, { useState } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import Carrito from './components/Carrito';
import ListaProductos from './components/ListaProductos';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const usuario = "User";
  const tipo = "Administrador";

  const navItems = ["Inicio", "Productos", "Carrito"];

  const [seccion, setSeccion] = useState("Inicio");

  const [carrito, setCarrito] = useState([]);

    const productos = [
      {
        'id': 1,
        'nombre': 'Remera',
        'precio': 200,
        'cantidad': 0
      },{
        'id': 2,
        'nombre': 'Pantalon',
        'precio': 300,
        'cantidad': 0
      },{
        'id': 3,
        'nombre': 'Campera',
        'precio': 500,
        'cantidad': 0
      },{
        'id': 4,
        'nombre': 'Gorro',
        'precio': 50,
        'cantidad': 0
      }
    ]

 // Productos Ofertas >>>>>>>>> Administracion Carrito [N]
  const renderContenido = () => 
    {
    switch (seccion) {
      case "Inicio":
        return <Home />;
      case "Productos":
        return <ListaProductos productos={productos} carrito={carrito} setCarrito={setCarrito} />;
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
