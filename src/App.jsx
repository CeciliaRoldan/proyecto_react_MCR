import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Carrito from './components/Carrito';
import Productos from './components/Productos';
import DetalleProducto from './components/DetalleProducto'
import Login from './components/Login';
import RutaProtegida from './components/RutaProtegida';
import AdminProductos from './components/AdminProductos';
import FormProducto from './components/FormProducto';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

//          <RutaProtegida> <AdminProductos/> </RutaProtegida> } 


function App() {


  return (
  <div className="d-flex flex-column min-vh-100">
    <Helmet>
      <title>Denome</title>
      <meta name="description" content="Explora nuestra variedad de productos." />
    </Helmet>
    <ToastContainer autoClose={2000}/>
    <Header/>              
    <Nav/>
    <div className="flex-grow-1 p-3">
      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/productos/:categoria" element={<Productos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <AdminProductos/> } 
        />
        <Route path="/editar/:modo/:id" element={<FormProducto />} />
        <Route path="/carrito" element={
          <RutaProtegida> <Carrito/> </RutaProtegida> } 
        />
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
    <Footer />
  </div>
  );
}

export default App;
