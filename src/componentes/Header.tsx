import { faCartPlus, faBurger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Link } from "react-router-dom";
import imgsrc from '../archivos/logo.png';
import Image from 'react-bootstrap/Image'
import { SessionContext } from "../context/SessionContext";
const Header: React.FC = () => {
  const navigate = useNavigate();
  const carritoContext = useContext(CarritoContext)
  const sessionContext = useContext(SessionContext)
  return (
    <header className="header">
      <div className="header-logo">
      <Image src={imgsrc} fluid alt="logo" />
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
          <Link to="/empleado">Empleado</Link>
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
            <a href="/login">{sessionContext.isLogged ? "Perfil" : "Iniciar Sesion"}</a>
          </button >
        </div>

    </header>
  );
};

export default Header