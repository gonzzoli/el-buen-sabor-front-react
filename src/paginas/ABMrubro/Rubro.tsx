import React from "react";
import { TipoRubro,EstadoRubro } from "../../tipos/Rubro";
import BotonNuevoRubro from "../../componentes/ComponentesABMRubro/BotonNuevoRubro";
import BorrarRubro from "../../componentes/ComponentesABMRubro/BorrarRubro";
import TablaRubro from "../../componentes/ComponentesABMRubro/TablaRubro";
interface RubroProps{
    id: number;
    nombreRubro: string;
    tipoRubro: TipoRubro;
    estado: EstadoRubro;
    ingredienteRubro: string;
}

const Rubro: React.FC<RubroProps> = ({}) => {
    return(
        <>
    
        <BotonNuevoRubro/>
        <BorrarRubro onClick={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        <TablaRubro/>

        </>
    )
}



export default Rubro;