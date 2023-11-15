import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import "./estilos_generales.scss";
import PaginaPrincipal from "./paginas/PaginaPrincipal/PaginaPrincipal";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ABMProducto from "./paginas/ABMProducto/ABMProducto";
import NavBar from "./componentes/NavBar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Container, Spinner } from "react-bootstrap";
import * as React from "react";
import Loader from "./componentes/Loader/Loader";
import AppRoutes from "./rutas/Rutas";


function App() {
  return (
    <>
    <React.Suspense fallback={<Spinner animation="border" />}>
      <BrowserRouter>
        <NavBar />
        <Router />
      </BrowserRouter>
    </React.Suspense>
    {/* <ToastContainer/>
    <Router>
      <Header/>
        <Container style={{minHeight: '100vh', minWidth: '100%', padding: '0'}}>
          <Suspense fallback={<Loader/>}>
            <AppRoutes/>
          </Suspense>
        </Container>
      <Footer/>
    </Router> */}
  </>
);

   
    // <>
    // <NavBar/>
    //   <Header />
    //   {/* <Routes>
    //     <Route path="/" element={<PaginaPrincipal />} />
    //     <Route path="/otraPagina" element={<h3>El elemento de su pagina</h3>} />
    //     <Route path="*" element={<h2>No se encontro la pagina</h2>} />
    //     <Route path=""/>
    //     <Route path="/admin" element={<ABMProducto/>}/>
    //   </Routes> */}
    //   <Footer />
    // </>
}

export default App;
