import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
//hook de logged in que todavia no implemento
//import useIsLoggedIn from '../../hooks/useIsLoggedIn';

const NavBar: React.FC = () => {
  // Utils
  //const navigate = useNavigate();
  //const isLoggedIn: boolean = useIsLoggedIn();

  // Handlers
  //function onLogOut() {
  //  window.localStorage.removeItem('isLoggedIn');
  // navigate('/');
 // }

  // Render
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">El Buen Sabor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="">Empleados</Nav.Link>
            {/* <Nav.Link as={Link} to="">Home</Nav.Link>
            <Nav.Link as={Link} to="">Components</Nav.Link>
            <Nav.Link as={Link} to="">Admin</Nav.Link> */}
            {/* {isLoggedIn && <Nav.Link onClick={onLogOut}>Log Out</Nav.Link>} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default NavBar;