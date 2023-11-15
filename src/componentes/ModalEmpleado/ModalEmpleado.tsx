import { Button, Form, Modal } from "react-bootstrap";
import { Empleado } from "../../tipos/Empleado";
import { ModalType } from "../../tipos/ModalType";
import * as Yup from "yup";
import {useFormik} from "formik";
import { EmpleadoService } from "../../sevicios/EmpleadoService";
import { toast } from 'react-toastify';


type ModalEmpleadoProps = {
    	show: boolean;
    	onHide: () => void;
    	title:string
        modalType: ModalType;
        empl: Empleado;
        refreshData: React.Dispatch<React.SetStateAction<boolean>>;
  };


  const ModalEmpleado = ({ show, onHide, title, modalType, empl, refreshData }: ModalEmpleadoProps) => {
     //CREATE - UPDATE
   const handleSaveUpdate = async (empl: Empleado) => {
            try {
                const isNew = empl.id === 0;
                if (isNew) {
                    await EmpleadoService.registrarEmpleado(empl);
                } else {
                    await EmpleadoService.updateEmpleado(empl.id, empl);
                }
                toast.success(isNew ? "Producto Creado" : "Producto Actualizado", {
                    position: "top-center",
                });
            onHide();
            refreshData(prevState => !prevState);
            } catch (error) {
                console.error(error);
                toast.error('A ocurrido un error');
            }
        };
        const handleDelete = async () => {
            try {
                await EmpleadoService.deleteEmpleado(empl.id);
                toast.success("Producto Borrado", {
                    position: "top-center",
                  });    
                onHide();
                refreshData(prevState => !prevState);
            } catch (error) {
                console.error(error);
                toast.error('A ocurrido un error');
            }
        }
    
        //Yup
        const validationSchema = () => {
            return Yup.object().shape({
            id: Yup.number().integer().min(0),
        nombre: Yup.string().required('El nombre es requerido'),
        apellido: Yup.string().required('El apellido es requerido'),
        email: Yup.string().required('El email es requeridao'),
        telefono: Yup.string().required('El telefono es requerido')
            });
        };

        //Formik
        
        const formik = useFormik({
            initialValues: empl,
            validationSchema: validationSchema(),
            validateOnChange: true,
            validateOnBlur: true,
            onSubmit: (obj: Empleado) => handleSaveUpdate(obj),
        });


    return (
        <>
            {modalType === ModalType.DELETE ? (
                <>
                   <Modal show={show} onHide={onHide} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Está seguro que desea dar de baja el Empleado?<br/> <strong>{empl.nombre}</strong>?</p>
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
                            <Form onSubmit={formik.handleSubmit}>
                                {/* Debajo de la etiqueta Form, vamos a armar un <Form.Group> por cada uno de los campos para dar de alta o modificar un producto. */}
                                <Form.Group controlId="formTitulo">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control
                                        name="Nombre"
                                        type="text"
                                        value={formik.values.nombre || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.nombre}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formTitulo">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        name="Apellido"
                                        type="text"
                                        value={formik.values.apellido || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.apellido}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="Email"
                                        type="string"  //chequear si puede ser type email
                                        value={formik.values.email || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.email && formik.touched.email)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formTelefono">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        name="Telefono"
                                        type="number"
                                        value={formik.values.telefono || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.telefono}
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
    );
};



export default ModalEmpleado;


