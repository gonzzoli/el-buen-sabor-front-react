import ProductoCarta from "./ProductoCarta";

interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  tiempoEstimadoCocina: number;
  verDetalles: () => void
  agregarCarrito: () => void
}

interface CategoriaProducto {
  nombreCategoria: string;
  productos: Producto[];
}

interface ListaProductosProps {
  categoriaProductos: CategoriaProducto[];
}

const ListaProductos: React.FC<ListaProductosProps> = ({
  categoriaProductos,
}) => {
  return (
    <div>
      {categoriaProductos.map((categoria: CategoriaProducto) => {
        return (
          <div className="categoria-productos">
            <h2 className="titulo-3 categoria-titulo">{categoria.nombreCategoria}</h2>
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
