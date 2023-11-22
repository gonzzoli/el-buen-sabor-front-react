import { Cliente } from "../../tipos/Cliente";
import { Container } from "react-bootstrap";
//import "../../estilos_generales.scss";
//Dependencias para validar los formularios
import * as Yup from "yup";
import { useFormik } from "formik";
import { ClienteService } from "../../sevicios/ClienteServicio";
//Notificaciones al usuario
import { toast } from 'react-toastify';
import {  useState } from "react";
import { useNavigate } from "react-router-dom";



const Registro: React.FC =()=> {
    const navigate = useNavigate();

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
const [isLoading, setIsLoading] = useState(true);
//Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
     const [refreshData, setRefreshData] = useState(false);

const validationSchema = () => {
    return Yup.object().shape({
    username: Yup.string().required('El usuario es requerido'),
    nombre: Yup.string().required('El nombre es requerido'),
    apellido: Yup.string().required('El apellido es requerido'),
    telefono: Yup.string().required('El telefono es requerido'),
    email: Yup.string().email().required('El email es requerido'),
    password: Yup.string().min(8).required('La contraseña es requerida'),
    });
};

    //CREATE-UPDATE función handleSaveUpdate 
    const handleSave = async (cliente: Cliente) => {
        try {
            await ClienteService.saveCliente(cliente);
            navigate("/")
            toast.success("Cliente Creado")
           /* onHide () => void;
            refreshData(prevState => !prevState);*/
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error');
        }
    };
//Lo que necesita el formulario
    const formik = useFormik({
        initialValues:{
            username: '',
            nombre: '',
            apellido: '',
            email:'',
            telefono:'',
            password:''
        },
    //La validacion que hacemos con YUP
        validationSchema: validationSchema,

    //Lo que pasa cuando se envía el formulario
        onSubmit: (obj: Cliente) => handleSave(obj),
        
    });

    return (
        <Container className="d-flex justify-content-center aling-items-center">
            <div className="border rounded-3 p-5 mt-5">
                <h1>Formulario de ingreso</h1>

                <form onSubmit={formik.handleSubmit}>
                <div className="mb-3 mt-3">
                        <label htmlFor="nombre" className="form-label">Usuario</label>
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
                            <div className="text-danger"> Error en usuario {/*formik.errors.usuario*/}</div>
                        ) : null}
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                        />
                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className="text-danger"> Error en nombre {/*formik.errors.usuario*/}</div>
                        ) : null}
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        name="apellido"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.apellido}
                        />
                        {formik.touched.apellido && formik.errors.apellido ? (
                            <div className="text-danger"> Error en apellido {/*formik.errors.usuario*/}</div>
                        ) : null}
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="telefono" className="form-label">Telefono</label>
                        <input
                        type="text"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.telefono}
                        />
                        {formik.touched.telefono && formik.errors.telefono ? (
                            <div className="text-danger"> Error en telefono {/*formik.errors.usuario*/}</div>
                        ) : null}
                    </div>
                    <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger"> Error en email {/*formik.errors.usuario*/}</div>
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
                        <button type="submit">
                            Crear Cuenta
                        </button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default Registro;