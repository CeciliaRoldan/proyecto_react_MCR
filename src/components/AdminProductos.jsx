import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { Link } from 'react-router-dom';


function AdminProductos({}) {

    const { productos, cargando, error } = useContext(ProductosContext);
    const [ listaProductos, setListaProductos ] = useState([]);

    useEffect(()=>{
        console.log('productos admin ', productos);
        setListaProductos(productos);
    }, [productos]);

    if (cargando || !productos) return (
        <div>
            <span class="h4">Cargando</span>
            <div class="spinner-border mx-3" role="status"></div>
        </div>
    );

    if (error) return ( <h3>{error}</h3> );

    return (
        <div class="container">
            <h1>Administrar Productos</h1>
            <Link to={`/editar/agregar/0`} >
                <button className="btn btn-dark">Agregar Producto</button>
            </Link>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto) => (
                            <tr>
                            <th scope="row">{producto.id}</th>
                            <td>{producto.nombre}</td>
                            <td>                
                                <Link to={`/editar/editar/${producto.id}`} className="card-header text-decoration-none" style={{backgroundColor:"aquamarine"}}>
                                    Editar
                                </Link>
                            </td>    
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
    
}/*
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
<form>
        <h2>Agregar Producto</h2>
        <div>
            <label>Nombre:</label>
            <input
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
            />
            {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
        </div>
        <div>
            <label>Precio:</label>
            <input
                type="number"
                name="precio"
                value={producto.precio}
                onChange={handleChange}required
            />
            {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>}
        </div>
        <div>
            <label>Descripción:</label>
            <textarea
                name="descripcion"
                value={producto.descripcion}
                onChange={handleChange}
            />
            {errores.descripcion && <p style={{ color: 'red'}}>{errores.descripcion}</p>}
        </div>
        <button type="button" onClick={handleCancelar}>Cancelar</button>
        <button type="button" onClick={() => handleAgregar(producto)}>Agregar</button>
        <button type="button" onClick={() => handleActualizar(producto)}>Actualizar</button>
        <button type="button" onClick={() => handleEliminar(producto)}>Eliminar</button>
        </form>*/
export default AdminProductos;