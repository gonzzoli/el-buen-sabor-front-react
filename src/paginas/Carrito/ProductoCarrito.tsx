import { Producto } from "../../tipos/Producto"

type ProductoCarrito = {
    producto: Producto,
    cantidad: number
}

const ProductoCarrito = (productoCarrito: ProductoCarrito) => {
    const {producto, cantidad} = productoCarrito
    return (
        <div className="producto-carrito">
            <div>
                <h4>{producto.nombre}</h4>
                <p>Cantidad: {cantidad}</p>
            </div>
            <div>
                <p>Precio unitario: ${producto.precio}</p>
                <h5>Subtotal: ${producto.precio * cantidad}</h5>
            </div>
            <div className="producto-carrito-derecha">
                <button className="boton-primario">+ Agregar</button>
                <button className="boton-secundario">- Quitar</button>
            </div>
        </div>
    )
}

export default ProductoCarrito