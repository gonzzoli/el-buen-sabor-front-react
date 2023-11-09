import fotoProducto from "../../archivos/hamburguesa-producto.jpg"

interface ProductoCartaProps {
  id: number
  nombre: string;
  descripcion: string;
  precio: number;
  tiempoEstimadoCocina: number;
  verDetalles: () => void;
  agregarCarrito: () => void;
}

const ProductoCarta: React.FC<ProductoCartaProps> = ({
  nombre,
  descripcion,
  precio,
  tiempoEstimadoCocina,
  verDetalles,
  agregarCarrito,
}) => {
  return (
    <div className="producto-carta">
      <img src={fotoProducto} alt="Imagen producto" />
      <div className="producto-informacion">
        <h3 className="titulo-5 producto-nombre">{nombre}</h3>
        <p className="texto-body producto-descripcion">
          {descripcion}
        </p>
        <p className="titulo-5 producto-precio">${precio}</p>
        <div className="producto-botones">
          <button onClick={verDetalles} className="boton-secundario boton-detalles-producto">
            Detalles
          </button>
          <button onClick={agregarCarrito} className="boton-primario boton-agregar-producto">
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCarta;
