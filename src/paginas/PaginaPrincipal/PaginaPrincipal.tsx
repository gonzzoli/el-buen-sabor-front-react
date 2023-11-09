import { useEffect, useState } from "react";
import "./PaginaPrincipal.scss";
import Hero from "../../componentes/Hero";
import fotoHero from "../../archivos/hero-foto.jpg";
import FiltrosProductos from "./FiltrosProductos";
import ListaProductos from "./ListaProductos";

interface Producto {
    nombre: string;
    descripcion: string;
    precio: number;
    verDetalles: () => void
    agregarCarrito: () => void
  }

  interface CategoriaProducto {
    nombreCategoria: string;
    productos: Producto[];
  }
  

const PaginaPrincipal: React.FC = () => {
  const [productos, setProductos] = useState<CategoriaProducto[]>([]);

  // aca traeriamos los productos desde el backend
  // primero hay que subirlo a render
  useEffect(() => {
    async function traerProductos() {
      const respuesta = fetch(
        `${import.meta.env.URL_API}/api/productos/paginaPrincipal`
      );
    }
    traerProductos();
  }, []);

  return (
    <div className="principal">
      <Hero texto="mansas burgers" rutaImagen={fotoHero} />
      <FiltrosProductos />
      <ListaProductos categoriaProductos={productos} />
    </div>
  );
};

export default PaginaPrincipal;
