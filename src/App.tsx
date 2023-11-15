import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import "./estilos_generales.scss";
import PaginaPrincipal from "./paginas/PaginaPrincipal/PaginaPrincipal";
import { Route, Routes } from "react-router-dom";
import Domicilio from "./paginas/ABMdomicilio/Domicilio";



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/otraPagina" element={<h3>El elemento de su pagina</h3>} />
        <Route path="*" element={<h2>No se encontro la pagina</h2>} />
        <Route path="/Domicilio" element={<Domicilio/>} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
