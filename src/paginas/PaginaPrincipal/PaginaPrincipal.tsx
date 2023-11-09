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
  tiempoEstimadoCocina: number;
  verDetalles: () => void;
  agregarCarrito: () => void;
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
      const respuesta = await fetch(
        `${import.meta.env.VITE_URL_API}/productos/paginaPrincipal`
      );
      console.log(respuesta);
      const datos = await respuesta.json();
      console.log(datos);
      setProductos(datos);
    }
    console.log("corriendo");
    traerProductos();
  }, []);

  return (
    <div className="principal">
      <Hero texto="mansas burgers" rutaImagen={fotoHero} />
      <FiltrosProductos />
      {productos.length > 0 && (
        <ListaProductos categoriaProductos={productos} />
      )}
    </div>
  );
};

export default PaginaPrincipal;
