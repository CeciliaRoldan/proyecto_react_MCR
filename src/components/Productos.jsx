import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Productos({ agregarAlCarrito }) {
    
    const { categoria } = useParams();
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(()=>{
        setCargando(true);

        let url = 'https://hp-api.onrender.com/api/characters';

        if (categoria) 
            url = url + '/house/' + categoria;
        
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
                        {producto.name}
                    </a>
                    <div class="card-body">
                        <div class="text-center mb-3">
                            <img class="card-img m-auto" src={producto.image} alt={"Imagen "+producto.name} style={{width:"150px",height:"200px"}}></img>
                        </div>
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item">Género: <strong>{producto.gender}</strong></li>
                            <li class="list-group-item">Varita: <strong>{producto.wand.wood ? producto.wand.wood : "-"}</strong></li>
                            <li class="list-group-item">Casa: <strong>{producto.house ? producto.house : "-"}</strong></li>
                        </ul>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <span>{producto.yearOfBirth ? `Precio: $ ${producto.yearOfBirth}` : 'No disponible'}</span>
                        <button onClick={() => agregarAlCarrito(producto)} class="btn btn-dark">Agregar al Carrito</button>
                    </div>
                </div>
            ))  
        }
    </div>
  );
}


export default Productos;