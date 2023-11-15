import { faCartPlus, faBurger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <FontAwesomeIcon icon={faBurger} />
        <h3>El buen sabor</h3>
      </div>
      <nav className="header-botones-links">
        <ul className="header-links">
          <li className="header-link">
            <a href="#">Inicio</a>
          </li>
          <li className="header-link">
            <a href="#">Pagina 1</a>
          </li>
          <li className="header-link">
            <a href="/cliente">MostarClientes</a>
          </li>
        </ul>
        <div className="header-botones">
          <button className="boton-secundario boton-carrito">
            <FontAwesomeIcon icon={faCartPlus} />
            <p>Carrito</p>
          </button>
          <button className="boton-primario">
            <a href="/login">Iniciar Sesion</a>
          </button >
        </div>
      </nav>
    </header>
  );
};

export default Header