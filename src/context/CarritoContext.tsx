import { PropsWithChildren, createContext, useState } from "react";
import { Producto } from "../tipos/Producto";

type ProductoCarrito = {
  producto: Producto;
  cantidad: number;
};

type CarritoContextType = {
  productosCarrito: ProductoCarrito[];
  agregarProducto: (producto: Producto) => void;
  eliminarProducto: (producto: Producto) => void;
};

export const CarritoContext = createContext<CarritoContextType>({
  productosCarrito: [],
  agregarProducto: (producto: Producto) => {},
  eliminarProducto: (producto: Producto) => {},
});

export const CarritoProvider: React.FC = ({
  children,
}: PropsWithChildren<{}>) => {
  const [productosCarrito, setProductosCarrito] = useState<ProductoCarrito[]>(
    []
  );

  const agregarProducto = (productoNuevo: Producto) => {
    const estabaAgregado = productosCarrito.find(
      (producto) => producto.producto.id === productoNuevo.id
    );
    if (!estabaAgregado)
      setProductosCarrito([
        ...productosCarrito,
        { producto: productoNuevo, cantidad: 1 },
      ]);

    setProductosCarrito((productos) => {
      return productos.map((productoCarrito) => {
        if (productoCarrito.producto.id == productoNuevo.id)
          return {
            ...productoCarrito,
            cantidad: productoCarrito.cantidad + 1,
          };
        return productoCarrito;
      });
    });
  };

  const eliminarProducto = (productoEliminar: Producto) => {
    setProductosCarrito((productos) => {
      const productoEnCarrito = productos.find(
        (productoCarrito) => productoCarrito.producto.id == productoEliminar.id
      );
      // si solo tenia una unidad pedida, lo elimina del arreglo
      if (productoEnCarrito?.cantidad == 1)
        return productos.filter(
          (productoCarrito) => productoCarrito.cantidad - 1 > 0
        );

      // si no, solo resta uno
      return productos.map((productoCarrito) => {
        if (productoCarrito.producto.id == productoEliminar.id)
          return {
            ...productoCarrito,
            cantidad: productoCarrito.cantidad - 1,
          };
        return productoCarrito;
      });
    });
  };

  return (
    <CarritoContext.Provider
      value={{ productosCarrito, agregarProducto, eliminarProducto }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
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
