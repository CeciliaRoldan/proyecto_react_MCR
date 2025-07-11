import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { ProductosContext } from '../context/ProductosContext';

function Productos({ }) {
    
    const { categoria } = useParams();
    
    const { agregarAlCarrito } = useContext(CarritoContext);
    const { productos, cargando, error } = useContext(ProductosContext);

    const [listaProductos, setListaProductos] = useState([]);

    useEffect(()=>{
        //console.log('productos ' + productos);

        if (categoria) 
            setListaProductos(productos.filter(producto => producto.nombre === categoria));
        else 
            setListaProductos(productos);
        
    }, [productos, categoria]);
    

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
            listaProductos.map((producto)=>( 
                <div class="card" href={`/producto/${producto.id}`} style={{width: "22rem"}} >
                    <Link to={`/producto/${producto.id}`} className="card-header text-decoration-none" style={{backgroundColor:"aquamarine"}}>
                        {producto.nombre}
                    </Link>
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