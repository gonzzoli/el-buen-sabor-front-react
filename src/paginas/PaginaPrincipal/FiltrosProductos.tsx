import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHamburger,
  faPizzaSlice,
  faLandmark,
  faBottleWater,
} from "@fortawesome/free-solid-svg-icons";
//import "./PaginaPrincipal.scss"

type FiltrosProductosProps = {
  aplicarFiltro: (nombreRubro: string)=>void
};

const FiltrosProductos: React.FC<FiltrosProductosProps> = ({
  aplicarFiltro
}) => {
  return (
    <div className="filtros-busqueda">
      <div className="rubros-iconos">
        <FontAwesomeIcon onClick={()=>{aplicarFiltro("Hamburguesas")}} className="icono" icon={faHamburger} />
        <FontAwesomeIcon onClick={()=>{aplicarFiltro("Pizzas")}} className="icono" icon={faPizzaSlice} />
        <FontAwesomeIcon onClick={()=>{aplicarFiltro("Lomos")}} className="icono" icon={faLandmark} />
        <FontAwesomeIcon onClick={()=>{aplicarFiltro("Bebidas")}} className="icono" icon={faBottleWater} />
      </div>
    </div>
  );
};

export default FiltrosProductos;
