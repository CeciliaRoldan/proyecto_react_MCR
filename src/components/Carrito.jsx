import React from 'react';
import { useState } from "react";
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { FaTrash } from 'react-icons/fa';


function Carrito ({ }) {

    const { carrito, handleEliminar, handleVaciar } = useContext(CarritoContext);

    const total = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);
    
    return(
    <div class="container" >  
        <div class="row">
            <div class="col">
                <h3 className="p-2">Disfraces seleccionados:</h3>
            </div>
            <div class="col">
                <div class="d-flex justify-content-end">
                    <button type="button" 
                            class="btn btn-outline-danger" 
                            aria-label='Vaciar el carrito'
                            onClick={() => handleVaciar()}
                    >
                        Vaciar Carrito
                    </button>
                </div>
            </div>
        </div>                  
        
        {
            carrito.map((producto)=>( 
                <div key={producto.id} class="row p-2 border-top">
                    <div class="col">
                        <span class="h4">{producto.nombre} { producto.cantidad > 1 && (<span>(x{producto.cantidad})</span>) }</span>
                    </div>
                    <div class="col-2 col-md-auto">
                        <div class="d-flex justify-content-end">
                            <p>$ {producto.precio}</p>
                        </div>
                    </div>
                    <div class="col-2 col-md-1">
                        <div class="d-flex justify-content-end">
                            <button type="button" 
                                    class="btn btn-outline-danger" 
                                    aria-label={`Eliminar el producto ${producto.nombre} del carrito`}
                                    onClick={() => handleEliminar(producto)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div> 
            ))  
        }
        <hr/>
        <div class="row">
            <div class="col">
                <h3>Total:</h3>
            </div>
            <div class="col">
                <div class="d-flex justify-content-end">
                    <p>$ {total.toFixed(2)}</p>
                </div>
            </div>
            <div class="col-2 col-md-1"></div> 
        </div> 
    </div>
    )
}

export default Carrito;