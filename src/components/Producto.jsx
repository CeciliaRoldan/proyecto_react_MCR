import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Producto({ carrito, setCarrito }) {

  const { id } = useParams();

  const [producto, setProducto] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  //const producto = productos.find(p => p.id === id);
  useEffect(()=>{
      fetch('https://fakestoreapi.com/products/'+id)
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

  if (error) return ( <h2>{error}</h2> );


  const agregarAlCarrito = (nuevo) => {

    const encontrado = carrito.find(p => p.id === nuevo.id);

    // Si el carrito ya tiene el producto se le aumenta en cantidad
    if (encontrado) {
        setCarrito(carrito.map(producto => (
            producto.id === nuevo.id ?
                { id: producto.id, 
                  nombre: producto.nombre, 
                  precio: producto.precio,
                  cantidad: producto.cantidad+1
                } :
                producto
        )))
    }

    // Si el carrito no tiene el producto lo agrega
    if (!encontrado) setCarrito([...carrito, {  id: nuevo.id, 
                                                nombre: nuevo.title, 
                                                precio: nuevo.price,
                                                cantidad: 1 }]);
  }


  return (
    <div class="container" >
      <div key={producto.id} class="border rounded" style={{borderColor:"grey",maxWidth:"800px"}}>
        <h3 class="p-2 px-5 d-flex align-items-center flex-column border-bottom" style={{backgroundColor:"aquamarine"}}>
            {producto.title}
        </h3>
        <img class="d-flex flex-column p-2" style={{width:"auto",height:"200px",borderRadius:"5px",margin:"auto"}}
            src={producto.image} alt={producto.title}
        />
        <p class="px-2" style={{display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"}}>
            {producto.description}
        </p>
        <div class="row align-baseline">
            <div class="col">
                <p class="p-2">
                    Precio: $ {producto.price}
                </p>
            </div>
            <div class="col">
                <button onClick={() => agregarAlCarrito(producto)} class="btn btn-dark m-2 float-end">
                    Agregar al Carrito
                </button>
            </div>
        </div>
      </div> 
    </div> 
  );
}

export default Producto;