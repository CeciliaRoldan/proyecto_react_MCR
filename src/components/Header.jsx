import { Container, Navbar } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';
import { FaUser } from "react-icons/fa";

function Header({ }) {

  const { user } = useAuthContext();

  return (
    <Navbar bg="dark" variant="dark" className="px-3" >
      <Container>
        <Navbar.Brand>Denome</Navbar.Brand>
        <Navbar.Text className='d-none d-md-block'>Venta de Disfraces</Navbar.Text>    
        { user && (
            <Navbar.Text className="ms-auto text-white"><FaUser size={20}/>&ensp;{ user }</Navbar.Text>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
