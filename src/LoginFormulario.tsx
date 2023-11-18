import { useFormik } from "formik";
import { Container, ToastContainer } from "react-bootstrap";
import * as Yup from "yup";
import "./estilos_generales.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { SessionContext } from "./context/SessionContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  username: Yup.string().required("El usuario es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener minimo 8 caracteres"),
});

const App: React.FC = () => {
  const sessionContext = useContext(SessionContext);
  const navigate = useNavigate()
  //Lo que necesita el formulario
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    //La validacion que hacemos con YUP
    validationSchema: validationSchema,

    //Lo que pasa cuando se envía el formulario
    onSubmit: async (values) => {
      try {
        const autenticado = await sessionContext.login(values);
        if(autenticado) navigate("/")
      } catch (error: unknown) {
        console.log("No pudo autenticarse")
      }
    },
  });

  return (
    <Container className="d-flex justify-content-center aling-items-center">
      <div className="border rounded-3 p-5 mt-5">
        <h1>Formulario de ingreso</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-danger">
                {" "}
                Error en Usuario {/*formik.errors.usuario*/}
              </div>
            ) : null}
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">
                {" "}
                Error en Contraseña {/*formik.errors.password*/}
              </div>
            ) : null}
          </div>
          <div className="text-end">
            <button type="submit" className="boton-primario">
              Enviar
            </button>
          </div>
        </form>
        <div className="mb-3 mt-3">
          <button className="boton-primario">
            <a href="/Registro"> Crear Cuenta</a>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default App;
