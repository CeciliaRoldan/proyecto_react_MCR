import React from 'react';
import { useState } from "react";

function Carrito ({ carrito }) {

    const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
    
    return(
    <div class="container" >
        {
            carrito.map((producto)=>( 
                <div key={producto.id} class="row p-2 border-top">
                    <div class="col">
                        <h3>{producto.nombre}</h3>
                    </div>
                    <div class="col">
                        <div class="d-flex justify-content-end">
                            <p>$ {producto.precio}</p>
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
                    <p>$ {total}</p>
                </div>
            </div>
        </div> 
    </div>
    )
}

export default Carrito;