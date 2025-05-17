import Button from 'react-bootstrap/Button';

function ListaProductos({ productos, carrito, setCarrito}) {


    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    }
// backgroundColor:"aliceblue",
  return (
    <div style={{display:"flex",gap:"20px",flexWrap:"wrap"}} class="">
        {
            productos.map((producto)=>( 
                <div key={producto.id} class="border rounded" style={{borderColor:"grey",minWidth:"300px"}}>
                    <h3 class="p-2 px-5 d-flex align-items-center flex-column border-bottom" style={{backgroundColor:"aquamarine"}}>
                        {producto.nombre}
                    </h3>
                    <p class="p-2">
                        Precio: $ {producto.precio}
                    </p>
                    <button onClick={() => agregarAlCarrito(producto)} class="btn btn-dark m-2 float-end">
                        Agregar al Carrito
                    </button>
                </div> 
            ))  
        }
    </div>
  );
}

export default ListaProductos;