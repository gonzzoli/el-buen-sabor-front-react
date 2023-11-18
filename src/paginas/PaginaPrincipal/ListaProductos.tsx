import ProductoCarta from "./ProductoCarta";

interface Producto {
  id: number
  nombre: string;
  descripcion: string;
  precio: number;
  tiempoEstimadoCocina: number;
  // verDetalles: () => void
  // agregarCarrito: () => void
}

interface RubroProducto {
  nombreRubro: string;
  productos: Producto[];
}

interface ListaProductosProps {
  rubroProductos: RubroProducto[];
}

const ListaProductos: React.FC<ListaProductosProps> = ({
  rubroProductos,
}) => {
  return (
    <div>
      {rubroProductos.map((categoria: RubroProducto) => {
        return (
          <div className="categoria-productos">
            <h2 className="titulo-3 categoria-titulo">{categoria.nombreRubro}</h2>
            <div className="categoria-lista-productos">
                {categoria.productos.map((producto: Producto) => {
                    return (
                        // le pasamos las props, que son las mismas que el tipo Producto
                        <ProductoCarta {...producto} />
                    )
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListaProductos;
