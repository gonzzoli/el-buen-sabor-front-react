import { createContext } from "react";
import { Producto } from "../tipos/Producto";

type ProductoCarrito = {
    producto: Producto[],
    cantidad: number
}

type CarritoContextProps = {
    productosCarrito: ProductoCarrito[],
    totalCarrito: number,
    agregarProducto: (producto: Producto) => void,
    eliminarProducto: (idProducto: number) => void
}

const CarritoContext = createContext<CarritoContextProps | null>(null)
