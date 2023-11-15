import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import "./estilos_generales.scss";
import PaginaPrincipal from "./paginas/PaginaPrincipal/PaginaPrincipal";
import { Route, Routes } from "react-router-dom";
import FondoModal from "./componentes/FondoModal";
import ModalCarrito from "./paginas/Carrito/ModalCarrito";
import { useContext } from "react";
import { CarritoContext } from "./context/CarritoContext";

function App() {
  const carritoContext = useContext(CarritoContext);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/otraPagina" element={<h3>El elemento de su pagina</h3>} />
        <Route path="*" element={<h2>No se encontro la pagina</h2>} />
      </Routes>

      {carritoContext.mostrarCarrito &&
      <FondoModal>
        <ModalCarrito />
      </FondoModal>
      }

      <Footer />
    </>
  );
}


export default App;
