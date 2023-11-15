import {Route, Routes} from "react-router-dom";
import Rubro from "../paginas/ABMrubro/Rubro"
import {TipoRubro,EstadoRubro} from "../tipos/Rubro"
import Registro from "../paginas/ABMCliente/RegistrarCiente";
const AppRoutes: React.FC = () => {
    return (
      <Routes>
          {/*<Route path='/' element={<HomePage/>}> </Route>
          <Route path='/componentes' element={<Componentes/>}> </Route>
          */}
          <Route path='/rubros' element={<Rubro id={0} nombreRubro={""} tipoRubro={TipoRubro.bebida} estado={EstadoRubro.activo}/>}> </Route>
          <Route path="/Registro" element={<Registro/>}/>
      </Routes>
    )
  }
  
  export default AppRoutes