import { Nav as BootstrapNav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';


function Nav({ }) {
  
  const { carrito } = useContext(CarritoContext);

  const cantProductos = carrito.reduce((acum,actual) => {return actual.cantidad + acum},0);

  //<BootstrapNav.Link as={Link} to="/">Home</BootstrapNav.Link>

  return (
    <Navbar expand="sm" style={{backgroundColor:"lavender"}}>
      <Container>
        <BootstrapNav className="me-auto">
            <BootstrapNav.Link as={Link} to="/">Todos</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/productos/gryffindor">Gryffindor</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/productos/slytherin">Slytherin</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/productos/hufflepuff">Hufflepuff</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/productos/ravenclaw">Ravenclaw</BootstrapNav.Link>
        </BootstrapNav>
        <BootstrapNav className="mr-2">
            <BootstrapNav.Link as={Link} to="/admin">Admin</BootstrapNav.Link>
            <BootstrapNav.Link as={Link} to="/carrito">Carrito [{cantProductos}]</BootstrapNav.Link>
        </BootstrapNav>

      </Container>
    </Navbar>
  );
}

export default Nav;
