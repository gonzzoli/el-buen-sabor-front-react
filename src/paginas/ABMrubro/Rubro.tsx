

import TablaRubro from "../../componentes/ComponentesABMRubro/TablaRubro";
import FiltrosProductos from "../PaginaPrincipal/FiltrosProductos";



const Rubro = () => {
    
    return(
        <>
         <div style={{ display: "flex", justifyContent: "space-between", margin: "40px" }}>
         <TablaRubro/>
        <FiltrosProductos/>
        </div>
        </>
    )
}



export default Rubro;