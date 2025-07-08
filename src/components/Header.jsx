import { Navbar } from 'react-bootstrap';

function Header({ }) {
      //  {tipo} - {usuario}
  return (
    <Navbar bg="dark" variant="dark" className="px-3" >
      <Navbar.Brand>Denome</Navbar.Brand>
      <Navbar.Text>Venta de Disfraces</Navbar.Text>    
      <Navbar.Text className="ms-auto text-white">
      </Navbar.Text>
    </Navbar>
  );
}

export default Header;
