import { PropsWithChildren, ReactNode, createContext, useState } from "react";
import { Producto } from "../tipos/Producto";

type ProductoCarrito = {
  producto: Producto;
  cantidad: number;
};

type CarritoContextType = {
  productosCarrito: ProductoCarrito[];
  mostrarCarrito: boolean;
  totalCarrito: number;
  handleMostrarCarrito: () => void;
  agregarProducto: (producto: Producto) => void;
  eliminarProducto: (producto: Producto) => void;
};

export const CarritoContext = createContext<CarritoContextType>({
  productosCarrito: [],
  mostrarCarrito: false,
  totalCarrito: 0,
  handleMostrarCarrito: () => {},
  agregarProducto: (producto: Producto) => {},
  eliminarProducto: (producto: Producto) => {},
});

export const CarritoContextProvider = ({ children }: PropsWithChildren) => {
  const [productosCarrito, setProductosCarrito] = useState<ProductoCarrito[]>(
    []
  );
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  let totalCarrito = 0;

  const agregarProducto = (productoNuevo: Producto) => {
    const estabaAgregado = productosCarrito.find(
      (producto) => producto.producto.id === productoNuevo.id
    );
    totalCarrito += productoNuevo.precio;
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
    totalCarrito -= productoEliminar.precio;
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

  const handleMostrarCarrito = () => {
    setMostrarCarrito((prevState) => !prevState);
  };

  return (
    <CarritoContext.Provider
      value={{
        productosCarrito,
        mostrarCarrito,
        totalCarrito,
        agregarProducto,
        eliminarProducto,
        handleMostrarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
