import { Routes, Route } from 'react-router-dom';
import * as React from 'react';



//Este seria el archivo de las rutas hacia las paginas 

const RegistrarEmpleado = React.lazy(() => import('../../paginas/ABMEmpleado/Empleados'));
const PaginaPrincipal = React.lazy(()=> import('../../paginas/PaginaPrincipal/PaginaPrincipal'));

const Router: React.FC = () => (
  <Routes>
    
    <Route element={<PaginaPrincipal />} path="/" />
    <Route element={<RegistrarEmpleado/>} path="/empleado/RegistrarEmpleado"/>

  </Routes>
);

export default Router;
