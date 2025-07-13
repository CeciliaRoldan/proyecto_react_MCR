import { Nav as BootstrapNav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { useAuthContext } from '../context/AuthContext';
import { FaShoppingCart } from "react-icons/fa";



function Nav({ }) {
  
  const { carrito } = useContext(CarritoContext);
  const { user } = useAuthContext();

  const cantProductos = carrito.reduce((acum,actual) => {return actual.cantidad + acum},0);


  return (
    <Navbar expand="sm" style={{backgroundColor:"lavender"}}>
      <Container className="d-flex flex-column flex-sm-row align-items-start mt-5">
        <BootstrapNav className="flex-column flex-sm-row">
            <BootstrapNav.Link as={Link} to="/" aria-label='Ir a home'>
              Todos
            </BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/productos/gorilla" aria-label='Ir a productos de categoria gorilas'>
              Gorilas
            </BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/productos/snake" aria-label='Ir a productos de categoria serpientes'>
              Serpientes
            </BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/productos/crocodile" aria-label='Ir a productos de categoria cocodrilos'>
              Cocodrilos
            </BootstrapNav.Link>
        </BootstrapNav>
        <BootstrapNav className="flex-column flex-sm-row">
            <BootstrapNav.Link as={Link} to="/login" aria-label='Ir al login'>
              { user ? "Logout" : "Login" }
            </BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/admin" aria-label='Ir a administrar un producto'>
              { user ? "Administrar Productos" : "" }
            </BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/carrito" aria-label='Ir al carrito'>
              { user && <><FaShoppingCart size={22}/>&ensp;[{ cantProductos }]</> }
            </BootstrapNav.Link>
        </BootstrapNav>
      </Container>
    </Navbar>    
  );
}

export default Nav;
