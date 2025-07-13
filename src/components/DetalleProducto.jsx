import React, { useState,useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { ProductosContext } from '../context/ProductosContext';

function DetalleProducto({  }) {

    const { id } = useParams();

    const { agregarAlCarrito } = useContext(CarritoContext);
    const { productos, cargando, error } = useContext(ProductosContext);


    const [producto, setProducto] = useState(null);

    useEffect(()=>{

        setProducto(productos.find(p => String(p.id) === String(id)));

    }, [productos]);


    if (cargando || !producto) return (
        <div>
            <span class="h4">Cargando</span>
            <div class="spinner-border mx-3" role="status"></div>
        </div>
    );

    if (error) return ( <h3>{error}</h3> );

    return (
        <Container>
            <div className='row'>
                <div className='col-12 col-md-6 mt-4 mb-4'>
                    <h1>{producto.nombre}</h1>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-12 col-md-6 col-lg-auto d-flex align-items-center' > 
                    <img src={producto.imagen} 
                         alt={"Imagen "+producto.nombre} 
                         className='img-fluid border border-dark rounded-3'
                         style={{width: "400px", height: "400px"}}/>
                </div>
                <div className='col-12 col-md-6 col-lg-auto mt-4 mt-md-0 p-4'>
                    <p>{producto.descripcion}</p>
                </div>
            </div>
            <div className='row'>
                <div className='col d-flex pt-3'>
                    <h4> {producto.precio ? `Precio: $ ${producto.precio}` : 'No disponible'} </h4>

                    <button onClick={() => agregarAlCarrito(producto)} class="btn btn-dark ms-auto" aria-label={`Agregar ${producto.nombre} al carrito`}>
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </Container> 
    );
}

export default DetalleProducto;