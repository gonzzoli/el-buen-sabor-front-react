import { useContext } from "react"
import { CarritoContext } from "../../context/CarritoContext"

interface Producto {
    idProducto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    tiempoEstimadoCocina: number;
    // verDetalles: () => void
    // agregarCarrito: () => void
  }

type ProductoCarrito = {
    producto: Producto,
    cantidad: number
}

const ProductoCarrito = (productoCarrito: ProductoCarrito) => {
    const {producto, cantidad} = productoCarrito
    console.log(producto)
    const carritoContext = useContext(CarritoContext)
    return (
        <div className="producto-carrito">
            <div className="producto-carrito-izquierda">
                <h4>{producto.nombre}</h4>
                <p>Cantidad: {cantidad}</p>
            </div>
            <div className="producto-carrito-centro">
                <p className="texto-body">Precio unitario: ${producto.precio}</p>
                <h5 className="titulo-5">Subtotal: ${producto.precio * cantidad}</h5>
            </div>
            <div className="producto-carrito-derecha">
                <button onClick={()=>{carritoContext.agregarProducto(producto)}} className="boton-primario">+ Agregar</button>
                <button onClick={()=>{carritoContext.eliminarProducto(producto)}} className="boton-secundario">- Quitar</button>
            </div>
        </div>
    )
}

export default ProductoCarrito