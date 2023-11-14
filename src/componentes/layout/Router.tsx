import { Routes, Route } from 'react-router-dom';
import * as React from 'react';


//Este seria el archivo de las rutas hacia las paginas 

const RegistrarEmpleado = React.lazy(() => import('../../paginas/ABMEmpleado/Empleados'));
//const Components = React.lazy(() => import('../pages/components/Components'));
//const Home = React.lazy(() => import('../pages/home/Home'));
//const Login = React.lazy(() => import('../pages/login/Login'));
//const PrivateRoute = React.lazy(() => import('./PrivateRoute'));

const Router: React.FC = () => (
  <Routes>
    <Route element={<RegistrarEmpleado/>} path="/Empleados"/>
    {/* <Route element={<Home />} path="/" />
    <Route element={<PrivateRoute element={<Admin />} />} path="/admin" />
    <Route element={<Components />} path="/components" />
    //<Route element={<Login />} path="/login" /> */}
  </Routes>
);

export default Router;
