import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';




function FormProducto({}) {
    
    const { modo, id } = useParams();

    const { productos, agregarProducto, editarProducto, eliminarProducto } = useContext(ProductosContext);

    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        descripcion: ''
    });

    const [errores, setErrores] = useState({});

    const API_URL = 'https://686a845ce559eba908703286.mockapi.io/api/v1/productos';
    const navigate = useNavigate();


    useEffect(()=>{
        if (modo === 'editar') {
            setProducto(productos.find(p => String(p.id) === String(id)));
        }
        console.log('Modo: ', modo);
        console.log('ID: ', id);
        //console.log('productos detalle ', productos);
        //let url = 'https://686a845ce559eba908703286.mockapi.io/api/v1/productos/'+id;
        //fetchProductos(url);

    }, [productos, id, modo]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };


    const validarFormulario = (producto) => {

        const nuevosErrores = {};
        if (!producto?.nombre?.trim()) {
            nuevosErrores.nombre = 'Ingrese un nombre.';
        }
        if (!producto?.precio || producto?.precio <= 0) {
            nuevosErrores.precio = 'El precio debe ser mayor a 0.';
        }
        if (!producto?.descripcion?.trim() || producto?.descripcion?.length < 10) {
            nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres.';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleAgregar = async (producto) => {
        if (!validarFormulario(producto)) return;
        try {
            const respuesta = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });
            if (!respuesta.ok) {
                throw new Error('Error al agregar el producto.');
            }
            const data = await respuesta.json();
            
            agregarProducto(data);
            Swal.fire({
                icon: "success",
                title: `Se agregó el producto "${producto.nombre}"`,
                showConfirmButton: false,
                timer: 1000
            });
            //alert('Producto agregado correctamente');
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
        navigate('/admin');
    };

    const handleEditar = async (producto) => {
        if (!validarFormulario(producto)) return;
        try {
            const respuesta = await fetch(`${API_URL}/${producto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });
            if (!respuesta.ok) {
                throw new Error('Error al actualizar el producto.');
            }
            const data = await respuesta.json();

            editarProducto(producto);
            Swal.fire({
                icon: "success",
                title: `Se actualizó el producto ${producto.nombre}`,
                showConfirmButton: false,
                timer: 1000
            });
            //alert('Producto actualizado correctamente');
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
        navigate('/admin');
    };

const handleEliminar = async (producto) => {
    const result = await Swal.fire({
        icon: 'warning',
        title: `¿Está seguro de eliminar el producto ${producto.nombre}?`,
        showConfirmButton: true,
        showCancelButton: true,
    });

    if (result.isConfirmed) {
        try {
            const respuesta = await fetch(`${API_URL}/${producto.id}`, {
                method: 'DELETE',
            });
            if (!respuesta.ok) {
                throw new Error('Error al eliminar el producto.');
            }

            const data = await respuesta.json();

            eliminarProducto(producto.id);
            await Swal.fire({
                icon: 'success',
                title: `Se eliminó el producto ${producto.nombre}`,
                showConfirmButton: false,
                timer: 1000,
            });

        } catch (error) {
            console.error(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    }
    navigate('/admin');
};


    const handleCancelar = () => {
        navigate('/admin');
    };


    if (!producto) return (
        <div>
            <span class="h4">Cargando</span>
            <div class="spinner-border mx-3" role="status"></div>
        </div>
    );

    return (
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
        { modo === 'agregar' && (
            <button type="button" onClick={() => handleAgregar(producto)}>Agregar</button>
        )}
        { modo === 'editar' && ( <>
            <button type="button" onClick={() => handleEditar(producto)}>Actualizar</button>
            <button type="button" onClick={() => handleEliminar(producto)}>Eliminar</button>
        </>)}
        </form>
    );
}

export default FormProducto;