import { Button, Form, Modal } from "react-bootstrap";
import { Domicilio } from "../tipos/Domicilio";
import { ModalType } from "../tipos/ModalType";
import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";

/* Dependencias para importar formularios */ 
import * as Yup from "yup";
import { useFormik } from "formik";
import { DomicilioService } from "../sevicios/DomicilioServicio";

/* Notificaciones al usuario */
import { toast } from "react-toastify";


/* Estilos */ 
import 'bootstrap/dist/css/bootstrap.min.css';

type ModalDomicilioProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    domicilio: Domicilio;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDomicilio = ({show, onHide, title, modalType, domicilio, refreshData}: ModalDomicilioProps) => {

    const sessionContext = useContext(SessionContext);
   
    const handleSaveUpdate =async (dom:Domicilio) => {

        /* Crear - Actualizar Producto */
        try {
            const isNew = dom.id === 0;
            if (isNew) {
                await DomicilioService.createDomicilio(dom, sessionContext.jwtToken);
            } else {
                await DomicilioService.updateDomicilio(dom.id, dom, sessionContext.jwtToken);  
            }
            toast.success(isNew ? "domicilio Creado" : "domicilio Actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error('error en HandleSaveUpdate',error);
            toast.error("Ha ocurrido un error.");
        }
        
    }

    const handleDelete =async () => {

        /* Borrar Producto */
        try {
            await DomicilioService.deleteDomicilio(domicilio.id);
            toast.success("Domicilio eliminado con éxito", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error.");
        }
    }

    /* Yup, esquema de validación */
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            calle: Yup.string().required('El nombre de la calle es requerido'),
            numero: Yup.number().required('El numero es requerido'),
            //localiad: Yup.string().required('La localiad es requerida'),
        });
    };
    /* Formik, utiliza el esquema de validación para crear un formulario dinámico y que lo bloquee en caso de errores */
    const formik = useFormik({
        initialValues: domicilio,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Domicilio) => handleSaveUpdate(obj),
    });

    return (
    <>
        {modalType === ModalType.DELETE ?  (
        <>
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title> {title} </Modal.Title>
                <Modal.Body>
                    <p>¿Está seguro que desea eliminar <br/> 
                    <strong> {domicilio.id} </strong> ? </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                    <Button variant="danger" onClick={handleDelete}> Eliminar </Button>
                </Modal.Footer>
            </Modal.Header>
        </Modal>
        </>
        ) : (
         <>
            <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {"Formulario"}
                    <Form onSubmit={formik.handleSubmit}>
                        
                        {/* From.Group por cada campo para dar de Alta o Modificar un Producto */}
                        
                        {/* Nombre de la calle */}
                        <Form.Group controlId="formCalle">
                            <Form.Label>calle</Form.Label>
                            <Form.Control
                                name="calle"
                                type="text"
                                value={formik.values.calle || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.calle && formik.touched.calle)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.calle}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Numero */}
                        <Form.Group controlId="formNumero">
                            <Form.Label>numero</Form.Label>
                            <Form.Control
                                name="numero"
                                type="number"
                                value={formik.values.numero || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.numero && formik.touched.numero)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.numero}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Localidad */}
                        <Form.Group controlId="formLocalidad">
                            <Form.Label>localidad</Form.Label>
                            <Form.Control
                                name="localidad"
                                type="text"
                                value={formik.values.localidad || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.localidad && formik.touched.localidad)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.localidad}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Modal.Footer className="mt-4">
                            <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                            <Button variant="primary" type="submit" disabled={!formik.isValid}> Guardar </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
    }
    </>
    )
}

export default ModalDomicilio