import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import "./estilos_generales.scss";
import PaginaPrincipal from "./paginas/PaginaPrincipal/PaginaPrincipal";
import { Route, Routes } from "react-router-dom";
import Rubro from "./paginas/ABMrubro/Rubro";
import { EstadoRubro, TipoRubro } from "./tipos/Rubro";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/otraPagina" element={<h3>El elemento de su pagina</h3>} />
        <Route path="*" element={<h2>No se encontro la pagina</h2>} />
        <Route path="/rubros" element={<Rubro id={0} nombreRubro={""} tipoRubro={TipoRubro.bebida} estado={EstadoRubro.activo} ingredienteRubro={""}/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
