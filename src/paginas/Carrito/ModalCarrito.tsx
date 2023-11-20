import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import ProductoCarrito from "./ProductoCarrito";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import './modalCarrito.scss'

const ModalCarrito = () => {
    const carritoContext = useContext(CarritoContext);

    return (
        <div className="ventana-emergente ventana-carrito">
            <Link to="/" onClick={carritoContext.handleMostrarCarrito} className="boton-secundario boton-volver">
                <FontAwesomeIcon icon={faArrowLeft} />
                Volver
            </Link>
            <h2 className="titulo-carrito">Tu Pedido</h2>
            <div className="carrito-lista-productos">
                {
                    carritoContext.productosCarrito.map(productoCarrito => <ProductoCarrito {...productoCarrito} />)
                }
            </div>
            <div className="ventana-carrito-abajo">
                <p>Total: ${carritoContext.totalCarrito}</p>
                <Link to="/carrito" onClick={carritoContext.handleMostrarCarrito} className="boton-primario">Confirmar</Link>
            </div>
        </div>
    )
}

export default ModalCarrito