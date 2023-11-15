import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";
import ProductoCarrito from "./ProductoCarrito";

const Carrito = () => {
  const carritoContext = useContext(CarritoContext);
  return (
    <div>
      <button className="boton-secundario">
        <FontAwesomeIcon icon={faArrowLeft} />
        Volver
      </button>
      <h2>Ya casi terminamos!</h2>

      {/*Hacer con formik despues */}
      <div></div>

      <div>
        <h1>Tu pedido</h1>
        <div>
          {carritoContext.productosCarrito.map((productoCarrito) => (
            <ProductoCarrito {...productoCarrito} />
          ))}
          <p>Tiempo de entrega estimado: MM minutos</p>
          <h3>Total: ${carritoContext.totalCarrito}</h3>
        </div>

        <button className="boton-primario">Confirmar pedido</button>
      </div>
    </div>
  );
};

export default Carrito;
