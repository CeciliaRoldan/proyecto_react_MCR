import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { ProductosContext } from '../context/ProductosContext';
import { useBusqueda } from "../context/BusquedaContext";
import { Col, Row } from 'react-bootstrap';
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const Imagen = styled.img`
  width: 300px;
  height: 300px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  object-fit: cover;
`;


function Productos({ }) {
    
    const { categoria } = useParams();
    
    const { agregarAlCarrito } = useContext(CarritoContext);
    const { productos, cargando, error } = useContext(ProductosContext);
    const { busqueda, setBusqueda } = useBusqueda();

    const [listaProductos, setListaProductos] = useState([]);



    // Paginacion

    const productosPorPagina = 12;
    const [ paginaActual, setPaginaActual ] = useState(1);

    // Calcular el índice de los productos a mostrar en la página actual
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = listaProductos.slice(indicePrimerProducto, indiceUltimoProducto);
    // Cambiar de página
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);


    useEffect(() => {
        let resultado = [...productos];

        if (categoria) {
            resultado = resultado.filter(producto => producto.nombre === categoria);
        }

        if (busqueda.trim()) {
            resultado = resultado.filter(producto =>
                producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        setListaProductos(resultado);
    }, [productos, categoria, busqueda]);

    

    if (cargando) return (
        <div>
            <span class="h4">Cargando</span>
            <div class="spinner-border mx-3" role="status"></div>
        </div>
    );

    if (error) return ( <h3>{error}</h3> );


  return (
    <>
        <Helmet>
          <title>{categoria ? `${categoria} | Denome` : "Productos | Denome"}</title>
          <meta name="description" content="Explora nuestra variedad de productos." />
        </Helmet>
        <div className="container mt-2">
            <div className='row'>
                <div className='col-12'>
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="form-control mb-3"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        aria-label="Buscar productos"
                    />
                </div>
                
            </div>
            <div className='row'>
                {
                    productosActuales.map((producto)=>( 
                        <div key={producto.id} className='col-12 col-md-6 col-lg-4 mb-4'>
                            <div class="card h-100">
                                <Link to={`/producto/${producto.id}`} 
                                    className="card-header text-decoration-none" 
                                    style={{backgroundColor:"aquamarine"}} 
                                    aria-label={`Ir al detalle de ${producto.nombre}`}
                                >
                                    {producto.nombre}
                                </Link>
                                <div class="card-body">
                                    <div class="text-center mb-3">
                                        <Imagen class="card-img m-auto" 
                                            src={producto.imagen} 
                                            alt={"Imagen " + producto.nombre} 
                                        />
                                    </div>
                                    <p>{producto.descripcion.slice(0,100)}</p>
                                </div>
                                <div class="card-footer d-flex justify-content-between align-items-center">
                                    <span>{producto.precio ? `Precio: $ ${producto.precio}` : 'No disponible'}</span>
                                    <button onClick={() => agregarAlCarrito(producto)} class="btn btn-dark" aria-label={`Agregar ${producto.nombre} al carrito`}>Agregar al Carrito</button>
                                </div>
                            </div>
                        </div>
                    ))  
                }
            </div>

            {/* Paginacion */}
            <div className="row justify-content-center">
                <div className='col-auto'>
                { paginaActual > 1 && (
                    <button type="button" 
                            class="btn btn-outline-dark my-4" 
                            onClick={() => cambiarPagina(paginaActual - 1)}
                            aria-label='Ir a la pagina anterior'
                    >
                        Anterior
                    </button>
                )}
                </div>
                <div className="col-auto my-4">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn mx-1 ${paginaActual === index + 1 ? "btn-dark" : "btn-outline-dark"}`}
                        onClick={() => cambiarPagina(index + 1)}
                        aria-label={`Ir a la página ${index + 1}`}
                    >
                        {index + 1}
                    </button>
                    ))}
                </div>
                <div className='col-auto'>
                    { paginaActual < totalPaginas && (
                        <button type="button" 
                                class="btn btn-outline-dark my-4" 
                                onClick={() => cambiarPagina(paginaActual + 1)}
                                aria-label='Ir a la pagina siguiente'
                        >
                            Siguiente
                        </button>
                    )}
                </div>
            </div>
        </div>
    </>
  );
}


export default Productos;

