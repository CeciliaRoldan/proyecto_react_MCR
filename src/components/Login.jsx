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
        <h2>Iniciar sesión</h2>
        <div>
            <label style={{width: "8rem"}} >Usuario:</label>
            <input
            style={{width: "15rem"}}
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            />
        </div>
        <div>
            <label style={{width: "8rem"}}>Contraseña:</label>
            <input
            style={{width: "15rem"}}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit">Aceptar</button>
        </form>

    </Container>
  );
};
