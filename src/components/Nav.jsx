import React from 'react';
import { Nav as BootstrapNav, Navbar, Container } from 'react-bootstrap';
//bg="dark"

function Nav({ items, onSeleccion }) {
  return (
    <Navbar  expand="sm" style={{backgroundColor:"lavender"}}>
      <Container>
        <BootstrapNav className="me-auto">
          {items.map((item) => (
            <BootstrapNav.Link key={item} onClick={() => onSeleccion(item)}>
              {item}
            </BootstrapNav.Link>
          ))}
        </BootstrapNav>
      </Container>
    </Navbar>
  );
}

export default Nav;
