import React, { useState,useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
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
        //console.log('productos detalle ', productos);

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
        <div class="container" >
            <Row>
                <Col>
                    <h1>{producto.nombre}</h1>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex align-items-center" > 
                    <img src={producto.imagen} alt={"Imagen "+producto.nombre} style={{width: "500px", height: "500px"}}/>
                </Col>
                <Col>
                    <p>{producto.descripcion}</p>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex pt-3">
                    <h4> {producto.precio ? `Precio: $ ${producto.precio}` : 'No disponible'} </h4>

                    <button onClick={() => agregarAlCarrito(producto)} class="btn btn-dark ms-auto">
                        Agregar al Carrito
                    </button>
                </Col>
            </Row>
        </div> 
    );
}

export default DetalleProducto;