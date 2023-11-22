//import {PedidoCocinaTable} from "../../componentes/Tablas/tablaPedocina";
import PedidoCocinaTable from "../../componentes/Tablas/tablaPedidoCocina"

const PedidoCocina = () => {
    return(
        <>
        
         <div style={{ display: "flex", justifyContent: "space-between", margin: "40px" }}>
         <PedidoCocinaTable/>
        </div>
        
         </>
    )
}

export default PedidoCocina