import React from "react";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import BotonNuevoRubro from "../../componentes/BotonNuevoRubro";
import { TipoRubro,EstadoRubro } from "../../tipos/Rubro";

interface RubroProps{
    id: number;
    nombreRubro: string;
    tipoRubro: TipoRubro;
    estado: EstadoRubro;
    ingredienteRubro: string;
}

const Rubro: React.FC<RubroProps> = ({nombreRubro,tipoRubro, estado,ingredienteRubro}) => {
    return(
        <>
        <Header />
        <BotonNuevoRubro/>
            <div className="rubro-details">
                <h2>{nombreRubro}</h2>
                <p>Tipo: {tipoRubro}</p>
                <p>Estado: {estado}</p>
                <p>Ingrediente: {ingredienteRubro}</p>
            </div>
      <Footer />

        </>
    )
}



export default Rubro;