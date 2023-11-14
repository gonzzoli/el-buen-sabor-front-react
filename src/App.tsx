import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import "./estilos_generales.scss";
import PaginaPrincipal from "./paginas/PaginaPrincipal/PaginaPrincipal";
import { Route, Routes } from "react-router-dom";
import ABMProducto from "./paginas/ABMProducto/ABMProducto";
import NavBar from "./componentes/NavBar";

function App() {
  return (
    <>
    <NavBar/>
      <Header />
      {/* <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/otraPagina" element={<h3>El elemento de su pagina</h3>} />
        <Route path="*" element={<h2>No se encontro la pagina</h2>} />
        <Route path=""/>
        <Route path="/admin" element={<ABMProducto/>}/>
      </Routes> */}
      <Footer />
    </>
  );
}

export default App;
