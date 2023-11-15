import React from "react";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import BotonNuevoRubro from "../../componentes/BotonNuevoRubro";

enum TipoRubro{
    bebida= 'BEBIDA',
    cocina='COCINA',
}
enum EstadoRubro{
    activo='ACTIVO',
    inactivo='INACTIVO',
}

interface RubroProps{
    id: number;
    nombreRubro: string;
    tipoRubro: TipoRubro;
    estado: EstadoRubro;
}

const Rubro: React.FC<RubroProps> = ({nombreRubro,tipoRubro, estado,}) => {
    return(
        <>
        <Header />
        <BotonNuevoRubro/>
            <div className="rubro-details">
                <h2>{nombreRubro}</h2>
                <p>Tipo: {tipoRubro}</p>
                <p>Estado: {estado}</p>
            </div>
      <Footer />

        </>
    )
}



export default Rubro;