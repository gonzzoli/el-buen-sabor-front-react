import{useFormik} from "formik";
import * as Yup from 'yup';

const validationSchema = Yup.object(
    {
        usuario: Yup.string().required('El usuario es requerido'),
        password: Yup.string().required('La contraseña es requerida').min(8,"La contraseña debe tener minimo 8 caracteres")
    }
)

const App= ()=> {
//Lo que necesita el formulario
    const formik = useFormik({
        initialValues:{
            usuario: '',
            password: '',
        },
    //La validacion que hacemos con YUP
        validationSchema: validationSchema,

    //Lo que pasa cuando se envía el formulario
        onsubmit: (values)=>{
            alert(JSON.stringify(values,null,2))
        }

    });


    return(
        <Container>

        <Container/>
    )
}

export default App