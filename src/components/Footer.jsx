import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <Container>
        <p className="mb-0">Local en Av. de los Incas 123, Buenos Aires.</p>
        <p className="mb-0">Teléfono de contacto: (11) 1234-4567.</p>
      </Container>
    </footer>
  );
}

export default Footer;