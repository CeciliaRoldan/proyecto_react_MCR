import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import styled from "styled-components";


const Tr = styled.tr`
  transition: transform 0.3s ease;
  transform-origin: center;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;


function AdminProductos({}) {

    const { productos, cargando, error } = useContext(ProductosContext);
    const [ listaProductos, setListaProductos ] = useState([]);

    useEffect(()=>{
        console.log('productos admin ', productos);
        setListaProductos(productos);
    }, [productos]);

    if (cargando || !productos) return (
        <div>
            <span className="h4">Cargando</span>
            <div className="spinner-border mx-3" role="status"></div>
        </div>
    );

    if (error) return ( <h3>{error}</h3> );

    return (
        <div className="container">
            <div className='row mt-4 mb-4'>
                <div className='col-12 col-md-8 col-lg-9'>
                    <h1>Administrar Productos</h1>
                </div>
                <div className='col-12 col-md-4 col-lg-3'>
                    <Link to={`/editar/agregar/0`} >
                        <button className="btn btn-dark btn-lg" aria-label='Agregar un nuevo producto'>Agregar Producto</button>
                    </Link>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col" className='h3'>Producto</th>
                    <th scope="col" className='h3'>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto) => (
                            <Tr>
                                <th scope="row">{producto.nombre}</th>
                                <td>                
                                    <Link to={`/editar/editar/${producto.id}`} 
                                        className="card-header text-decoration-none" 
                                        aria-label={`Editar el producto ${producto.nombre}`}
                                    >
                                        <FaEdit size={20}/>
                                    </Link>
                                </td>    
                            </Tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
    
}

export default AdminProductos;