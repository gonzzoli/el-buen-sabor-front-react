import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailForward } from "@fortawesome/free-solid-svg-icons/faMailForward";
import "../estilos_generales.scss";

const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <div className="redes-sociales">
          <p>Sigamos en contacto:</p>
          <div className="iconos-redes">
            <FontAwesomeIcon icon={faMailForward} />
            <FontAwesomeIcon icon={faMailForward} />
            <FontAwesomeIcon icon={faMailForward} />
            <FontAwesomeIcon icon={faMailForward} />
          </div>
        </div>
        <p className="footer-marca">El Buen Sabor</p>
      </footer>
    </>
  );
};

export default Footer;
