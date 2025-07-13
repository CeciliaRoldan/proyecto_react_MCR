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
            <div className='row mt-4 mb-2'>
                <div className='col-12 col-md-8'>
                    <h1>Administrar Productos</h1>
                </div>
                <div className='col-12 col-md-4 '>
                    <Link to={`/editar/agregar/0`} >
                        <button className="btn btn-dark">Agregar Producto</button>
                    </Link>
                </div>
            </div>
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
    
}

export default AdminProductos;