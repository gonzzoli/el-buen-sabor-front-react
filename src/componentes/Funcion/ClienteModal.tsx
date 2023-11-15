import { Cliente } from "../../tipos/Cliente";
import { ClienteDTOMA } from "../../tipos/DTOClienteMA";
import { ClienteDTOMC } from "../../tipos/DTOClienteMC";
import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../tipos/ModalType";

//Dependencias para validar los formularios
import * as Yup from "yup";
import { useFormik } from "formik";

import { ClienteService } from "../../sevicios/ClienteServicio";

//Notificaciones al usuario
import { toast } from 'react-toastify';




//Recibe parametros como props para que se renderice, su titulo y según qué operación queremos realizar.
type ClienteModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    cliente: Cliente;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
    
};





const ClienteModal = ({show, onHide, title, cliente, modalType, refreshData}:ClienteModalProps) => {

    //CREATE-UPDATE función handleSaveUpdate 
    const handleSave = async (cliente: Cliente) => {
    try {
        const isNew = cliente.id === 0;
        if (isNew) {
            await ClienteService.saveCliente(cliente);
        }
        toast.success(isNew ? "Producto Creado" : "No valido", {
            position: "top-center",
        });
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error('Ha ocurrido un error');
    }
    
};


//Función handleDelete (DELETE)
const handleDelete = async () => {
    try {
        await ClienteService.deleteCliente(cliente.id);
        toast.success("Cliente borrado", {
            position: "top-center",
        });
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error("Ha ocurrido un error");
        
    }
    
}
        //YUP - Esquema de validación
    const validationSchema = () => {
        return Yup.object().shape({
        id: Yup.number().integer().min(0),
        nombre: Yup.string().required('El nombre es requerido'),
        apellido: Yup.string().required('El apellido es requerido'),
        telefono: Yup.string().required('El telefono es requerido'),
        email: Yup.string().email().required('El email es requerido'),
        password: Yup.string().min(8).required('La contraseña es requerida'),
        });
    };
    

//Formik -  Utiliza el esquema de validación de YUP y obtiene un formulario dinámico que
// bloquea el formulario en caso de haber errores.
    const formik = useFormik({
        initialValues: cliente,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Cliente) => handleSave(obj),
     });



        return(
            <>

            {modalType === ModalType.DELETE ? (
                <>

                <Modal show={show} onHide={onHide} centered backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p> ¿Está seguro que desea eliminar el Cliente
                        <br /> <strong> {cliente.nombre} </strong> ?
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>

                    <Button variant="danger" onClick={handleDelete}>
                        Borrar
                    </Button>
                </Modal.Footer>

                </Modal>
                </>
            ) : (

                <>
                <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                    
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                    {"Formulario"}
                    <Form onSubmit={formik.handleSubmit}>
                        
                    {"Nombre"}
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="nombre"
                                type="text"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.nombre &&
                                formik.touched.nombre)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.nombre}
                             </Form.Control.Feedback>
                        </Form.Group>

                    {"Apellido"}
                        <Form.Group controlId="formApellido">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                name="apellido"
                                type="text"
                                value={formik.values.apellido || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.apellido &&
                                formik.touched.apellido)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.apellido}
                             </Form.Control.Feedback>
                        </Form.Group>

                    {"Telefono"}
                        <Form.Group controlId="formTelefono">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                name="telefono"
                                type="text"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.telefono &&
                                formik.touched.telefono)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.telefono}
                             </Form.Control.Feedback>
                        </Form.Group>

                    {"Email"}                
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                type="text"
                                value={formik.values.email || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.email &&
                                formik.touched.email)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
                             </Form.Control.Feedback>
                        </Form.Group>
                    
                    {"Contraseña"}                
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                name="password"
                                type="text"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.password &&
                                formik.touched.password)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                             </Form.Control.Feedback>
                        </Form.Group>
                

                            <Modal.Footer className="mt-4">
                                
                                <Button variant="secondary" onClick={onHide}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" type="submit" disabled={!formik.isValid}>
                                    Guardar
                                </Button>

                            </Modal.Footer>
                            </Form>
                               

                    </Modal.Body>

                </Modal>

            </>
        )}
        </>
    )

}

export default ClienteModal;