import { Producto } from "../../tipos/Producto"

type ProductoCarrito = {
    producto: Producto,
    cantidad: number
}

const ProductoCarrito = ({productoCarrito}) => {
    const {producto, cantidad} = productoCarrito
    return (
        <div>
            <div>
                <h4>{producto.nombre}</h4>
                <p>Cantidad: {cantidad}</p>
            </div>
            <div>
                <p>Precio unitario: ${producto.precio}</p>
                <h5>Subtotal: ${producto.precio * cantidad}</h5>
            </div>
            <div>
                <button className="boton-primario">+ Agregar</button>
                <button className="boton-secundario">- Quitar</button>
            </div>
        </div>
    )
}

export default ProductoCarrito