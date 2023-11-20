import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter } from "react-router-dom";
import { CarritoContextProvider } from "./context/CarritoContext.tsx";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionContextProvider } from "./context/SessionContext.tsx";
import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionContextProvider>
        <ToastContainer />
        <CarritoContextProvider>
          <App />
        </CarritoContextProvider>
      </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
