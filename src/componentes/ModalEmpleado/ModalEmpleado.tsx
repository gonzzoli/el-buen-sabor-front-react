import { Button, Form, Modal, ModalBody } from "react-bootstrap";
import { Empleado } from "../../tipos/Empleado";
import { ModalType } from "../../tipos/ModalType";
import * as Yup from "yup";
import {useFormik} from "formik";
import { EmpleadoService } from "../../sevicios/EmpleadoService";
import { toast } from 'react-toastify';
import "../../componentes/Tablas/TableStyles.css"

type ModalEmpleadoProps = {
    	show: boolean;
    	onHide: () => void;
    	title:string
        modalType: ModalType;
        empl: Empleado;
        refreshData: React.Dispatch<React.SetStateAction<boolean>>;
  };


  const ModalEmpleado = ({ show, onHide, title, modalType, empl, refreshData }: ModalEmpleadoProps) => {
//Handle Create
    const handleSave = async() => {
        try{
            await EmpleadoService.registrarEmpleado(empl);
            toast.success("Empleado Creado" ,{ position: "top-center"});
            onHide();
            refreshData(prevState => !prevState);
        } catch (error){
            console.error(error);
            toast.error('A ocurrido un error');
        }
    };
//HandleUpdate
   const handleUpdate = async (empl: Empleado) => {
            try {
                 
            await EmpleadoService.updateEmpleado(empl.id, empl);
                
                toast.success("Empleado Actualizado", {
                    position: "top-center"});
            onHide();
            refreshData(prevState => !prevState);
            } catch (error) {
                console.error(error);
                toast.error('A ocurrido un error');
            }
        };

//Handle delete
        const handleDelete = async () => {
            try {
                await EmpleadoService.deleteEmpleado(empl.id);
                toast.success("Empleado Borrado", {
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
        telefono: Yup.number().required('El telefono es requerido'),
        password: Yup.number().required('La contrasena es requerida')
            });
        };

        //Formik
        
        const formik = useFormik({
            initialValues: empl,
            validationSchema: validationSchema(),
            validateOnChange: true,
            validateOnBlur: true,
            onSubmit: (obj: Empleado) => handleUpdate(obj), //lo dejo para update falta para create
        });


    return (
        <>
            {modalType === ModalType.DELETE && (
                <>
                   <Modal className="modal-container" show={show} onHide={onHide} centered backdrop="static">
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
            )}
                {modalType === ModalType.UPDATE && (
                <>
                
                    <Modal  show={show} onHide={onHide} centered backdrop="static" className="modal-xl modal-container">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={formik.handleSubmit}>
                                {/* Debajo de la etiqueta Form, vamos a armar un <Form.Group> por cada uno de los campos para dar de alta o modificar un producto. */}
                                <Form.Group controlId="formNombreEmpleado">
                                    <Form.Label>Nombre Empleado</Form.Label>
                                    <Form.Control
                                        name="nombre"
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
                                <Form.Group controlId="formApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        name="apellido"
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
                                        name="email"
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
                                        name="telefono"
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
            {modalType === ModalType.CREATE && (
                <>
                
                <Modal   show={show} onHide={onHide} centered backdrop="static" className="modal-xl modal-container">
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            {/* Debajo de la etiqueta Form, vamos a armar un <Form.Group> por cada uno de los campos para dar de alta o modificar un producto. */}
                            <Form.Group controlId="formNombreEmpleado">
                                <Form.Label>Nombre Empleado</Form.Label>
                                <Form.Control
                                    name="nombre"
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
                            <Form.Group controlId="formApellido">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    name="apellido"
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
                                    name="email"
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
                                    name="telefono"
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
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="text"
                                    value={formik.values.password || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.password && formik.touched.password)} // chequear si con formik podemos verifica el password y su sintaxis probablemente la del back no haga falta
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formRol">
                                <Form.Label>Rol</Form.Label>
                                <Form.Control
                                    name="rol"
                                    type="text"
                                    value={formik.values.rol || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.rol && formik.touched.rol)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.rol}
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
  }
   

export default ModalEmpleado;


