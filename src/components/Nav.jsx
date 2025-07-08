import { Nav as BootstrapNav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { useAuthContext } from '../context/AuthContext';


function Nav({ }) {
  
  const { carrito } = useContext(CarritoContext);
  const { user } = useAuthContext();

  const cantProductos = carrito.reduce((acum,actual) => {return actual.cantidad + acum},0);


  return (
    <Navbar expand="sm" style={{backgroundColor:"lavender"}}>
      <Container>
        <BootstrapNav className="me-auto">
            <BootstrapNav.Link as={Link} to="/">Todos</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/productos/gorilla">Gorilas</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/productos/snake">Serpientes</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/productos/crocodile">Cocodrilos</BootstrapNav.Link>
        </BootstrapNav>
        <BootstrapNav className="mr-2">
            <BootstrapNav.Link as={Link} to="/login">{ user ? user : "Login" }</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/admin">{ user ? "Administrar" : "Administrar" }</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/carrito">{ user ? `Carrito [${cantProductos}]`: "" }</BootstrapNav.Link>
        </BootstrapNav>

      </Container>
    </Navbar>
  );
}

export default Nav;
