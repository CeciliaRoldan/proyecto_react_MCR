import { Nav as BootstrapNav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


/*
            <BootstrapNav.Link key={item} onClick={() => onSeleccion(item)}>
              {item}
            </BootstrapNav.Link>

    <div class="container"  style={{backgroundColor:"lavender"}}>
      <nav>
        <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        </ul>
      </nav>
    </div>
*/

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
