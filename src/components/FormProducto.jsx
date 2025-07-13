import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from "styled-components";
import { toast } from "react-toastify";


const Boton = styled.button`
  background-color: aquamarine;
  border: 1px solid black;
  transition: transform 0.3s ease;
  &:hover {
    background-color: aquamarine;
    border: 1px solid black;
    transform: scale(1.10);
  }
`;



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
            await toast.success(`Se agregó el producto "${producto.nombre}"`);
            
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
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
            await toast.success(`Se actualizó el producto ${producto.nombre}`);

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
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
            await toast.success(`Se eliminó el producto ${producto.nombre}`);

        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
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
        <form className="container mt-2">
        <h2 className='mb-4'>Agregar Producto</h2>
        <div className='row'>
            <div className='col-12 mb-3'>
                <label className='form-label'>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    className='form-control' 
                    placeholder='Ingrese el nombre del producto'
                />
                {errores.nombre && <p className='text-danger'>{errores.nombre}</p>}
            </div>
            <div className='col-12 mb-3'>
                <label className='form-label'>Precio:</label>
                <input
                    type="number"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                    className='form-control' 
                    placeholder='Ingrese el precio del producto'
                    required
                />
                {errores.precio && <p className='text-danger'>{errores.precio}</p>}
            </div>
            <div className='col-12 mb-3'>
                <label className='form-label'>Descripción:</label>
                <textarea
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={handleChange}
                    className='form-control' 
                    placeholder='Ingrese la descripción del producto'
                />
                {errores.descripcion && <p className='text-danger'>{errores.descripcion}</p>}
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <button type="button" className='btn btn-outline-danger me-2' onClick={handleCancelar} aria-label='Cancelar los cambios'>Cancelar</button>
                { modo === 'editar' && ( 
                    <>
                        <button type="button" 
                                className='btn btn-danger' 
                                aria-label='Eliminar el producto de la lista'
                                onClick={() => handleEliminar(producto)} 
                        >
                            Eliminar
                        </button>
                        <Boton type="button" 
                               className='btn float-end' 
                               aria-label='Actualizar la infomación del producto'
                               onClick={() => handleEditar(producto)}
                        >
                            Actualizar
                        </Boton>
                    </>
                )}
                { modo === 'agregar' && (
                    <Boton type="button" 
                           className='btn me-2 float-end' 
                           aria-label='Agregar el producto'
                           onClick={() => handleAgregar(producto)}
                    >
                        Agregar
                    </Boton>
                )}
            </div>
        </div>
    </form>
    );
}

export default FormProducto;