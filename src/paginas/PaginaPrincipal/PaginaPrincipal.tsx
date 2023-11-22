import { useEffect, useState } from "react";
import "./PaginaPrincipal.scss";
import Hero from "../../componentes/Hero";
import fotoHero from "../../archivos/hamburguesa-producto.jpg";
import FiltrosProductos from "./FiltrosProductos";
import ListaProductos from "./ListaProductos";

interface Producto {
  idProducto: number;
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

const PaginaPrincipal: React.FC = () => {
  const [productos, setProductos] = useState<RubroProducto[]>([]);
  const [productosMostrados, setProductosMostrados] = useState<
    RubroProducto[]
  >([]);
  const [aplicandoFiltros, setAplicandoFiltros] = useState(false);

  // aca traeriamos los productos desde el backend
  // primero hay que subirlo a render
  useEffect(() => {
    async function traerProductos() {
      const respuesta = await fetch(
        `${import.meta.env.VITE_URL_API}/productos/paginaPrincipal`
      );
      const datos = await respuesta.json();
      console.log(datos);
      setProductos(datos);
      setProductosMostrados(datos);
    }
    console.log("corriendo");
    traerProductos();
  }, []);

  const aplicarFiltro = (nombreRubro: string) => {
    setProductosMostrados(
      productos.filter(
        (rubroProducto) => rubroProducto.nombreRubro == nombreRubro
      )
    );
    return
  };

  return (
    <div className="principal">
      <Hero
        texto="El Buen Sabor. Vas a volver por mas..."
        rutaImagen={fotoHero}
      />
      <FiltrosProductos aplicarFiltro={aplicarFiltro} />
      {productos.length > 0 && (
        <ListaProductos
          rubroProductos={productosMostrados}
        />
      )}
    </div>
  );
};

export default PaginaPrincipal;
