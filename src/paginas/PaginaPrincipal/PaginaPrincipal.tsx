import { useEffect, useState } from 'react';
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
    }
    console.log("corriendo");
    traerProductos();
  }, []);

  return (
    <div className="principal">
      <Hero texto="El buen Sabor. Bien sabroso todo lo que gozo. El Buen Sabroso" rutaImagen={fotoHero} />
      <FiltrosProductos />
      {productos.length > 0 && (
        <ListaProductos rubroProductos={productos} />
      )}
    </div>
  );
};

export default PaginaPrincipal;
