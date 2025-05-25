import React, { useState,useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function DetalleProducto({ agregarAlCarrito }) {

  const { id } = useParams();

  const [producto, setProducto] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(()=>{
      fetch('https://hp-api.onrender.com/api/character/'+id)
      .then(response => response.json())
      .then(data => {
          setProducto(data[0]); 
          setCargando(false);
          })
      .catch(error => {
          console.log(error);
          setError("Ocurrio un error al cargar el personaje!");
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

// id name alternate_names species gender house dateOfBirth yearOfBirth wizard ancestry eyeColour
// hairColour wand patronus hogwartsStudent hogwartsStaff actor alternate_actors alive image	

  return (
    <div class="container" >
        <Row>
            <Col>
                <h1>{producto.name}</h1>
            </Col>
        </Row>
        <Row>
            <Col className="d-flex align-items-center">
                <img src={producto.image} alt={"Imagen "+producto.name}/>
            </Col>
            <Col>
                <ul class="list-group">
                    <li class="list-group-item">Género: <strong>{producto.gender}</strong></li>
                    <li class="list-group-item">Varita: <strong>{producto.wand.wood ? producto.wand.wood : "-"}</strong></li>
                    <li class="list-group-item">Especie: <strong>{producto.species ? producto.species : "-"}</strong></li>
                    <li class="list-group-item">Ojos: <strong>{producto.eyeColour ? producto.eyeColour : "-"}</strong></li>
                    <li class="list-group-item">Pelo: <strong>{producto.hairColour ? producto.hairColour : "-"}</strong></li>
                    <li class="list-group-item">Ancestros: <strong>{producto.ancestry ? producto.ancestry : "-"}</strong></li>
                    <li class="list-group-item">Casa: <strong>{producto.house ? producto.house : "-"}</strong></li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Col className="d-flex pt-3">
                <h4> {producto.yearOfBirth ? `Precio: $ ${producto.yearOfBirth}` : 'No disponible'} </h4>

                <button onClick={() => agregarAlCarrito(producto)} class="btn btn-dark ms-auto">
                    Agregar al Carrito
                </button>
            </Col>
        </Row>
    </div> 
  );
}

export default DetalleProducto;