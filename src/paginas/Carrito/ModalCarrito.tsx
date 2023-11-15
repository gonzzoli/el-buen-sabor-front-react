import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import ProductoCarrito from "./ProductoCarrito";

const ModalCarrito = () => {
    const carritoContext = useContext(CarritoContext);

    return (
        <div>
            <button>
                <FontAwesomeIcon icon={faArrowLeft} />
                Volver
            </button>
            <h2>Tu Pedido</h2>
            <div>
                {
                    carritoContext.productosCarrito.map(productoCarrito => <ProductoCarrito productoCarrito={productoCarrito} />)
                }
            </div>
            <div>
                <p>Total: ${carritoContext.totalCarrito}</p>
                <button className="boton-primario">Confirmar</button>
            </div>
        </div>
    )
}

export default ModalCarrito