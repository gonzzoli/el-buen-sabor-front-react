import {Route, Routes} from "react-router-dom";
// import Rubro from "../paginas/ABMrubro/Rubro"
import Domicilio from "../paginas/ABMdomicilio/Domicilio";

const AppRoutes: React.FC = () => {
    return (
      <Routes>
          {/*<Route path='/' element={<HomePage/>}> </Route>;

          <Route path='/componentes' element={<Componentes/>}> </Route>;

          <Route path='/rubros' element={<Rubro/>}> </Route>;

          <Route path='/rubros' element={<Rubro/>}> </Route>;*/

         <Route path='/Domicilio' element={<Domicilio/>}> </Route>
    }
      </Routes>
    )
  }
  
  export default AppRoutes