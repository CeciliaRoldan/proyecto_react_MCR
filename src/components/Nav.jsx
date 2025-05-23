import { Nav as BootstrapNav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Nav({ items, onSeleccion }) {
  return (
    <Navbar  expand="sm" style={{backgroundColor:"lavender"}}>
      <Container>
        <BootstrapNav className="me-auto">
            <BootstrapNav.Link><Link to="/">Home</Link></BootstrapNav.Link>
            <BootstrapNav.Link><Link to="/productos">Productos</Link></BootstrapNav.Link>
            <BootstrapNav.Link><Link to="/carrito">Carrito</Link></BootstrapNav.Link>
        </BootstrapNav>
      </Container>
    </Navbar>
  );
}

export default Nav;
