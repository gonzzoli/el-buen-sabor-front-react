import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import "./estilos_generales.scss";
import PaginaPrincipal from "./paginas/PaginaPrincipal/PaginaPrincipal";
import { Route, Routes } from "react-router-dom";
import ClienteAMB from "./paginas/ABMCliente/Cliente";
import Load from "./LoginFormulario";
import Registro from "./paginas/ABMCliente/RegistrarCiente";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/otraPagina" element={<h3>El elemento de su pagina</h3>} />
        <Route path="*" element={<h2>No se encontro la pagina</h2>} />
        <Route path="/cliente" element={<ClienteAMB/>}/>
        <Route path="/login" element={<Load/>}/>
        <Route path="/Registro" element={<Registro/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
