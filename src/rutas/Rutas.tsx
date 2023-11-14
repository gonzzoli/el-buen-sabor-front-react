import {Route, Routes} from "react-router-dom";
import Rubro from "../paginas/ABMrubro/Rubro"
import PaginaPrincipal from "../paginas/PaginaPrincipal/PaginaPrincipal";
const AppRoutes: React.FC = () => {
    return (
      <Routes>
          {/*
          <Route path='/componentes' element={<Componentes/>}> </Route>
          */}
          <Route path='/' element={<PaginaPrincipal/>}> </Route>
          <Route path='/rubros' element={<Rubro/>}> </Route>
    
      </Routes>
    )
  }
  
  export default AppRoutes