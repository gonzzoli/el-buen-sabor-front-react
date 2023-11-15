import{useFormik} from "formik";
import { Container } from "react-bootstrap";
import * as Yup from 'yup';
import "./estilos_generales.scss";
import { JSX } from "react/jsx-runtime";


const validationSchema = Yup.object(
    {
        usuario: Yup.string().required('El usuario es requerido'),
        password: Yup.string().required('La contraseña es requerida').min(8,"La contraseña debe tener minimo 8 caracteres")
    }
)

const App: React.FC = () =>  {
//Lo que necesita el formulario
    const formik = useFormik({
        initialValues:{
            usuario: '',
            password: '',
        },
    //La validacion que hacemos con YUP
        validationSchema: validationSchema,

    //Lo que pasa cuando se envía el formulario
        onSubmit: (values)=>{
            alert(JSON.stringify(values,null,2));
        },

    });


    return (
        <Container className="d-flex justify-content-center aling-items-center">
            <div className="border rounded-3 p-5 mt-5">
                <h1>Formilario de ingreso</h1>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="usuario" className="form-label">Usuario</label>
                        <input
                        type="text"
                        className="form-control"
                        id="usuario"
                        name="usuario"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.usuario}
                        />
                        {formik.touched.usuario && formik.errors.usuario ? (
                            <div className="text-danger"> Error en Usuario {/*formik.errors.usuario*/}</div>
                        ) : null}
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
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
                            <div className="text-danger"> Error en Contraseña {/*formik.errors.password*/}</div>
                        ) : null}
                        

                    </div>
                    <div className="text-end">
                        <button type="submit" >
                            Enviar
                        </button>
                        <button type="submit" >
                            Crear Cuenta
                        </button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default App;