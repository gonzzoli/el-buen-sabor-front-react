import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import "./estilos_generales.scss";
import PaginaPrincipal from "./paginas/PaginaPrincipal/PaginaPrincipal";
import { Route, Routes } from "react-router-dom";
import ClienteAMB from "./paginas/ABMCliente/Cliente";
import Load from "./LoginFormulario";
import Registro from "./paginas/ABMCliente/RegistrarCiente";
import FondoModal from "./componentes/FondoModal";
import ModalCarrito from "./paginas/Carrito/ModalCarrito";
import { useContext } from "react";
import { CarritoContext } from "./context/CarritoContext";
import ABMProducto from "./paginas/ABMProducto/ABMProducto";
import { Container } from "react-bootstrap"
import { Suspense } from "react"

import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'
import Empleados from "./paginas/ABMEmpleado/Empleados";
import ABMIngrediente from "./paginas/ABMingrediente/ABMIngrediente";

/* Son de prueba */

import Carrito from "./paginas/Carrito/Carrito";
import Rubro from "./paginas/ABMrubro/Rubro";


function App() {
  const carritoContext = useContext(CarritoContext);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/otraPagina" element={<h3>El elemento de su pagina</h3>} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<h2>No se encontro la pagina</h2>} />
        <Route path="/cliente" element={<ClienteAMB/>}/>
        <Route path="/login" element={<Load/>}/>
        <Route path="/Registro" element={<Registro/>}/>
        <Route path="/productos" element={<ABMProducto/>}/>
        <Route path="/empleado/registrarEmpleado" element={<Empleados/>}/>
        <Route path="/rubros" element={<Rubro/>}/>
        <Route path="/ingredientes" element={<ABMIngrediente/>}/>
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
