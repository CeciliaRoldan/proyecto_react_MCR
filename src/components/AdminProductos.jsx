import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";


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
                <div className='col-12 col-md-8 col-lg-10'>
                    <h1>Administrar Productos</h1>
                </div>
                <div className='col-12 col-md-4 col-lg-2'>
                    <Link to={`/editar/agregar/0`} >
                        <button className="btn btn-dark" aria-label='Agregar un nuevo producto'>Agregar Producto</button>
                    </Link>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col" className='h3'>Producto</th>
                    <th scope="col" className='h3'>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto) => (
                            <tr>
                                <th scope="row">{producto.nombre}</th>
                                <td>                
                                    <Link to={`/editar/editar/${producto.id}`} 
                                          className="card-header text-decoration-none" 
                                          aria-label={`Editar el producto ${producto.nombre}`}
                                    >
                                        <FaEdit size={20}/>
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