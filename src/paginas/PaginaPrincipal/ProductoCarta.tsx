import { useContext } from "react";
import fotoProducto from "../../archivos/hamburguesa-producto.jpg";
import { CarritoContext } from "../../context/CarritoContext";

interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  tiempoEstimadoCocina: number;
  // verDetalles: () => void
  // agregarCarrito: () => void
}


const ProductoCarta: React.FC<Producto> = (producto: Producto) => {
  const carritoContext = useContext(CarritoContext);

  const mostrarDetalles = () => {
    console.log(producto.nombre);
  };

  const agregarCarrito = () => {
    carritoContext.agregarProducto(producto);
  };

  return (
    <div className="producto-carta">
      <img src={fotoProducto} alt="Imagen producto" />
      <div className="producto-informacion">
        <h3 className="titulo-5 producto-nombre">{producto.nombre}</h3>
        <p className="texto-body producto-descripcion">{producto.descripcion}</p>
        <p className="titulo-5 producto-precio">${producto.precio}</p>
        <div className="producto-botones">
          <button
            onClick={mostrarDetalles}
            className="boton-secundario boton-detalles-producto"
          >
            Detalles
          </button>
          <button
            onClick={agregarCarrito}
            className="boton-primario boton-agregar-producto"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCarta;
