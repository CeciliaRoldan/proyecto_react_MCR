import { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';


export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => 
{
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);


    const fetchProductos = async (url) => {
        setCargando(true);

        try {
            const respuesta = await
            fetch(url);
            if (!respuesta.ok) {
                throw new Error('Ocurrio un error al cargar los productos!');
            }
            const data = await respuesta.json();
            setProductos(data);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }

        setCargando(false);
    };

    useEffect(()=>{
        let url = 'https://686a845ce559eba908703286.mockapi.io/api/v1/productos';
        
        fetchProductos(url);
        console.log('FETCHING ', productos);
    }, []);



    const agregarProducto = (nuevoProducto) => {
        setProductos([...productos, nuevoProducto]);
    };

    const editarProducto = (productoActualizado) => {
        setProductos(
        productos.map((producto) =>
            producto.id === productoActualizado.id ? productoActualizado :
            producto)
        );
    };

    const eliminarProducto = (producto) => {
        setProductos(productos.filter((p) => p.id !== producto.id));
    };

    return (
        <ProductosContext.Provider value={{ productos, agregarProducto, editarProducto, eliminarProducto, cargando, error }}>
            {children}
        </ProductosContext.Provider>
    );
};


