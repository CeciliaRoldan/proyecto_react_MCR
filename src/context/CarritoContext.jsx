import { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

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

        toast.success('Se agrego '+ producto_nuevo.nombre +' al carrito');
    }


    const handleEliminar = (producto_elim) => {

        setCarrito(carrito.filter(producto => producto.id !== producto_elim.id));
        toast.success('Se eliminó el producto '+ producto_elim.nombre +' del carrito');
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
                toast.success('Se vació el carrito');
            }
        });
    }


    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, handleEliminar, handleVaciar }}>
            {children}
        </CarritoContext.Provider>
    );
};


