import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Container } from 'react-bootstrap';
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";


export default function Login({ }) {

    const { login, logout } = useAuthContext();
  
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usuario === 'admin' && password === '1234') {
            login(usuario);
            navigate('/');
            toast.success('Bienvenido ' +  usuario);
        } else {
            toast.error('Credenciales incorrectas ... pruebe con admin/1234');
        }
    };

    useEffect(() => {
        logout();
    }, []);

  return (
    <Container className=''>
        <Helmet>
            <title>Login | Denome</title>
            <meta name="description" content="Accedé a tu cuenta para acceder al carrito." />
        </Helmet>

        <form onSubmit={handleSubmit}>
        <h1 className='col-12 col-lg-4 col-md-6 mt-4 mb-4 mx-auto'>Iniciar sesión</h1>
        <div className='row'>
            <div className='col-12 col-lg-4 col-md-6 mb-3 mx-auto'>
                <label className='form-label' >Usuario:</label>
                <input className='form-control' 
                       type="text"
                       value={usuario}
                       onChange={(e) => setUsuario(e.target.value)}
                       aria-label='Usuario'
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
                       aria-label='Contraseña'
                />
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col-12 col-lg-4 col-md-6 text-end mx-auto'>
                <button type="submit" className='btn btn-dark' aria-label='Aceptar'>Aceptar</button>
            </div>
        </div>
        </form>

    </Container>
  );
};
