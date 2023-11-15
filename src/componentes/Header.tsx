import { faCartPlus, faBurger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom'import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Header: React.FC = () => {
  const Navigate = useNavigate();
  const carritoContext = useContext(CarritoContext)
  return (
    <header className="header">
      <div className="header-logo">
        <FontAwesomeIcon icon={faBurger} />
        <h3>El buen sabor</h3>
      </div>
      {/* TODO ESTO SE PODRÍA REEMPLAZAR POR LO DE ABAJO
      <nav className="header-botones-links">
        <ul className="header-links">
          <li className="header-link">
            <a href="/">Inicio</a>
          </li>
          <li className="header-link">
            <a href="#">Pagina 1</a>
          </li>
          <li className="header-link">
            <a href="#">Pagina 2</a>
          </li>
          <li className="header-link">
            <a href="/productos">Productos</a>
          </li>
          <li className="header-link">
            <a href="/empleado/RegistrarEmpleado">Empleados</a>
          </li>
          <li className="header-link">
            <a href="http://localhost:5173/rubros">Rubros</a>
          </li>
        </ul>*/}

        <Nav className="me-auto">
           
            <Nav.Link onClick={() => Navigate('/')}>PaginaPrincipal</Nav.Link>
            <Nav.Link onClick={() => Navigate('/rubros')}>Rubros</Nav.Link>
            
            
        
        <div className="header-botones">
            <button onClick={carritoContext.handleMostrarCarrito} className="boton-secundario boton-carrito">
              <FontAwesomeIcon icon={faCartPlus} />
              <p>Carrito</p>
            </button>
            <button className="boton-primario">
              <p>Iniciar Sesion</p>
            </button>
        </div>
        </Nav>
    </header>
  );
};

export default Header