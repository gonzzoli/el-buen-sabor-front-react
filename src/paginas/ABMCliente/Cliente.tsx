import React from "react";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import TablaCliente from "../../componentes/Tablas/TabCliente";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Router } from "react-router-dom";
const ClienteAMB = () => {
    return(
        <>
        <ToastContainer></ToastContainer>
        <Route>
        <Header />
        <TablaCliente/>
      <Footer />
    </Route>
        </>
    )
}



export default ClienteAMB;




