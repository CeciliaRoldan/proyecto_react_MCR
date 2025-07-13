import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function Login({ }) {

    const { login } = useAuthContext();
  
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usuario === 'admin' && password === '1234') {
            login(usuario);
            navigate('/');
        } else {
            Swal.fire({
            icon: "warning",
            title: 'Credenciales incorrectas ... pruebe con admin/1234',
            showConfirmButton: false,
            timer: 1500
            });
        }
    };

  return (
    <Container className=''>
        
        <form onSubmit={handleSubmit}>
        <h1 className='col-12 col-lg-4 col-md-6 mt-4 mb-4 mx-auto'>Iniciar sesión</h1>
        <div className='row'>
            <div className='col-12 col-lg-4 col-md-6 mb-3 mx-auto'>
                <label className='form-label' >Usuario:</label>
                <input className='form-control' 
                       type="text"
                       value={usuario}
                       onChange={(e) => setUsuario(e.target.value)}
                />
            </div>
        </div>
        <div className='row'>
            <div className='col-12 col-lg-4 col-md-6 mb-3 mx-auto'>
                <label className='form-label'>Contraseña:</label>
                <input className='form-control' 
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col-12 col-lg-4 col-md-6 text-end mx-auto'>
                <button type="submit">Aceptar</button>
            </div>
        </div>
        </form>

    </Container>
  );
};
