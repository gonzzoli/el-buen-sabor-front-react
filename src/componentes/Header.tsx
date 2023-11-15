import { faCartPlus, faBurger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const Navigate = useNavigate();
  const carritoContext = useContext(CarritoContext)
  return (
    <header className="header">
      <div className="header-logo">
        <FontAwesomeIcon icon={faBurger} />
        <h3>El buen sabor</h3>
      </div>
      <nav className="header-botones-links">
        <ul className="header-links">
          <li className="header-link">
            <Link to="/">Inicio</Link>
          </li>
          <li className="header-link">
          <Link to="/cliente">Mostrar clientes</Link>
          </li>
          <li className="header-link">
          <Link to="/productos">Productos</Link>
          </li>
          <li className="header-link">
          <Link to="/empleado/RegistrarEmpleado">Empleado</Link>
          </li>
          <li className="header-link">
            <Link to="/rubros">Rubros</Link>
          </li>
          <li className="header-link">
            <Link to="/ingredientes">Ingredientes</Link>
          </li>
        </ul>
        </nav>
        <div className="header-botones">
          <button onClick={carritoContext.handleMostrarCarrito} className="boton-secundario boton-carrito">
            <FontAwesomeIcon icon={faCartPlus} />
            <p>Carrito</p>
          </button>
          <button className="boton-primario">
            <a href="/login">Iniciar Sesion</a>
          </button >
        </div>

    </header>
  );
};

export default Header