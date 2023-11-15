import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";
import useEmpleado from "./Hooks/useEmpleado";


// Tabla de empleados a realizar
const TablaEmpleado = React.lazy(() => import('../../componentes/TablaEmpleado'));

const Empleados: React.FC = () => {
  // Utils
  const { data, error, loading } = useEmpleado();

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
      </Alert>
    );
  }

  return loading
    ? (
      <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
        <Spinner animation="border" />
      </div>
    )
    : (
      <React.Suspense fallback={<Spinner animation="border" />}>
        <TablaEmpleado/>
      </React.Suspense>
    )
};

export default Empleados;
