import { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';


export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => 
{
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto_nuevo) => {

        const encontrado = carrito.find(p => p.id === producto_nuevo.id);

        // Si el carrito ya tiene el producto se le aumenta en cantidad
        if (encontrado) {
            setCarrito(carrito.map(producto => (
                producto.id === producto_nuevo.id ?
                    { id: producto.id, 
                    nombre: producto.nombre, 
                    precio: producto.precio,
                    cantidad: producto.cantidad+1
                    } :
                    producto
            )))
        }

        // Si el carrito no tiene el producto lo agrega
        if (!encontrado) setCarrito([...carrito, {  id: producto_nuevo.id, 
                                                    nombre: producto_nuevo.nombre, 
                                                    precio: producto_nuevo.precio,
                                                    cantidad: 1 }]);
        
        Swal.fire({
        icon: "success",
        title: 'Se agrego '+ producto_nuevo.nombre +' al carrito',
        showConfirmButton: false,
        timer: 1000
        });
    }


    const handleEliminar = (producto_elim) => {

        setCarrito(carrito.filter(producto => producto.id !== producto_elim.id));
        
        Swal.fire({
            icon: "success",
            title: 'Se eliminó el producto '+ producto_elim.nombre +' del carrito',
            showConfirmButton: false,
            timer: 1000
        });
    }


    const handleVaciar = () => {

        Swal.fire({
            icon: 'warning',
            title: 'Está seguro de vaciar el carrito?',
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setCarrito([]);
                
                Swal.fire({
                icon: "success",
                title: 'Se vació el carrito',
                showConfirmButton: false,
                timer: 1000
                });
            }
        });
    }


    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, handleEliminar, handleVaciar }}>
            {children}
        </CarritoContext.Provider>
    );
};


