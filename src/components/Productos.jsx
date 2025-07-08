import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

function Productos({ }) {
    
    const { categoria } = useParams();
    
    const { agregarAlCarrito } = useContext(CarritoContext);

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(()=>{
        setCargando(true);

        let url = 'https://686a845ce559eba908703286.mockapi.io/api/v1/productos';

        if (categoria) 
            url = url + '?nombre=' + categoria;
        
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setProductos(data); 
            setCargando(false);
        })
        .catch(error => {
            console.log(error);
            setError("Ocurrio un error al cargar los personajes!");
            setCargando(false);
        });
    }, [categoria]);
    

    if (cargando) return (
        <div>
            <span class="h4">Cargando</span>
            <div class="spinner-border mx-3" role="status"></div>
        </div>
    );

    if (error) return ( <h3>{error}</h3> );


  return (
    
    <div style={{display:"flex",gap:"20px",flexWrap:"wrap"}} class="">
        {
            productos.map((producto)=>( 
                <div class="card" href={`/producto/${producto.id}`} style={{width: "22rem"}} >
                    <a href={`/producto/${producto.id}`} class="card-header text-decoration-none" style={{backgroundColor:"aquamarine"}}>
                        {producto.nombre}
                    </a>
                    <div class="card-body">
                        <div class="text-center mb-3">
                            <img class="card-img m-auto" src={producto.imagen} alt={"Imagen "+producto.nombre} style={{width:"150px",height:"200px"}}></img>
                        </div>
                          <p>{producto.descripcion.slice(0,100)}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <span>{producto.precio ? `Precio: $ ${producto.precio}` : 'No disponible'}</span>
                        <button onClick={() => agregarAlCarrito(producto)} class="btn btn-dark">Agregar al Carrito</button>
                    </div>
                </div>
            ))  
        }
    </div>
  );
}


export default Productos;