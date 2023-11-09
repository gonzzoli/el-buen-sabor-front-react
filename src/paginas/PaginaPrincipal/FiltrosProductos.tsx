import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHamburger,
  faPizzaSlice,
  faLandmark,
  faBottleWater,
} from "@fortawesome/free-solid-svg-icons";
//import "./PaginaPrincipal.scss"

const FiltrosProductos: React.FC = () => {
  return (
    <div className="filtros-busqueda">
      <div className="rubros-iconos">
        <FontAwesomeIcon className="icono" icon={faHamburger} />
        <FontAwesomeIcon className="icono" icon={faPizzaSlice} />
        <FontAwesomeIcon className="icono" icon={faLandmark} />
        <FontAwesomeIcon className="icono" icon={faBottleWater} />
      </div>
      <input
        className="buscador-texto"
        type="text"
        placeholder="Buscar un producto..."
      />
    </div>
  );
};

export default FiltrosProductos;
