import TablaEmpleado from "../../componentes/TablaEmpleado";
import "../../estilos_generales.scss";

// // Tabla de empleados a realizar
// const TablaEmpleado = React.lazy(() => import('../../componentes/TablaEmpleado'));

const Empleados = () => {
  return(
    <div className="m-3">
    <TablaEmpleado/>
    </div>
  )
}
export default Empleados

//   // Utils
//   const { data, error, loading } = useEmpleado();

//   // Render
//   if (error) {
//     return (
//       <Alert variant="danger">
//         {error?.message || 'Something went wrong while fetching products.'}
//       </Alert>
//     );
//   }

//   return loading
//     ? (
//       <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
//         <Spinner animation="border" />
//       </div>
//     )
//     : (
//       <React.Suspense fallback={<Spinner animation="border" />}>
//         <TablaEmpleado/>
//       </React.Suspense>
//     )
// };

