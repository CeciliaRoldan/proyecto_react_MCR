import React, { useState,useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

function DetalleProducto({  }) {

    const { id } = useParams();

    const { agregarAlCarrito } = useContext(CarritoContext);

    const [producto, setProducto] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

  
    useEffect(()=>{
        fetch('https://686a845ce559eba908703286.mockapi.io/api/v1/productos/'+id)
        .then(response => response.json())
        .then(data => {
            setProducto(data); 
            setCargando(false);
            })
        .catch(error => {
            console.log(error);
            setError("Ocurrio un error al cargar el producto!");
            setCargando(false);
        });
    }, []);

    if (cargando) return (
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
                    <img src={producto.imagen} alt={"Imagen "+producto.nombre} style={{width: "500px"}}/>
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