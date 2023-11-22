import { Button, Form, Modal, ModalBody } from "react-bootstrap";
import { Empleado } from "../../tipos/Empleado";
import { ModalType } from "../../tipos/ModalType";
import * as Yup from "yup";
import { useFormik } from "formik";
import { EmpleadoService } from "../../sevicios/EmpleadoService";
import { toast } from "react-toastify";
import "../../componentes/Tablas/TableStyles.css";
import { SessionContext } from "../../context/SessionContext";
import { useContext } from "react";

type ModalEmpleadoProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  empl: Empleado;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalEmpleado = ({
  show,
  onHide,
  title,
  modalType,
  empl,
  refreshData,
}: ModalEmpleadoProps) => {
  const sessionContext = useContext(SessionContext);
  //Handle Create
  const handleSave = async (empl: Empleado) => {
    try {
      await EmpleadoService.registrarEmpleado(empl, sessionContext.jwtToken);
      toast.success("Empleado Creado", { position: "top-center" });
      onHide();
      refreshData((prevState) => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("A ocurrido un error");
    }
  };
  //HandleUpdate
  const handleUpdate = async (empl: Empleado) => {
    try {
      await EmpleadoService.updateEmpleado(empl);

      toast.success("Empleado Actualizado", {
        position: "top-center",
      });
      onHide();
      refreshData((prevState) => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("A ocurrido un error");
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
      refreshData((prevState) => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("A ocurrido un error");
    }
  };

  //Yup
  const validationSchema = () => {
    return Yup.object().shape({
      id: Yup.number().integer().min(0),
      nombre: Yup.string().required("El nombre es requerido"),
      apellido: Yup.string().required("El apellido es requerido"),
      email: Yup.string().required("El email es requeridao"),
      telefono: Yup.number().required("El telefono es requerido"),
    });
  };

  const validationSchema2 = () => {
    return Yup.object().shape({
      id: Yup.number().integer().min(0),
      username: Yup.string().required("El usuario es requerido"),
      nombre: Yup.string().required("El nombre es requerido"),
      apellido: Yup.string().required("El apellido es requerido"),
      email: Yup.string().required("El email es requeridao"),
      telefono: Yup.number().required("El telefono es requerido"),
      password: Yup.string().required("La contrasena es requerida"),
      rol: Yup.string().required("El rol es requerido")
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
  const formik2 = useFormik({
    initialValues: empl,
    validationSchema: validationSchema2(),
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: (obj: Empleado) => handleSave(obj),
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
                
                    <Modal  show={show} onHide={onHide} centered backdrop="static" className="modal modal-container">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={formik.handleSubmit}>
                                {/* Debajo de la etiqueta Form, vamos a armar un <Form.Group> por cada uno de los campos para dar de alta o modificar un producto. */}
                                <Form.Group controlId="formid">
                                    <Form.Label>ID Empleado</Form.Label>
                                    <Form.Control
                                        name="id"
                                        type="text"
                                        value={formik.values.id || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.id && formik.touched.id)}
                                        disabled 
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.id}
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        El ID no se puede modificar.
                                    </Form.Text>
                                </Form.Group>
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
                                {/* <Form.Group controlId="formRol">
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
                                    {formik2.errors.rol}
                                </Form.Control.Feedback>
                            </Form.Group> */} 
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
                
                <Modal   show={show} onHide={onHide} centered backdrop="static" className="modal modal-container">
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={formik2.handleSubmit}>
                            {/* Debajo de la etiqueta Form, vamos a armar un <Form.Group> por cada uno de los campos para dar de alta o modificar un producto. */}
                            <Form.Group controlId="formsername">
                                <Form.Label>Nombre Usuario</Form.Label>
                                <Form.Control
                                    name="username"
                                    type="text"
                                    value={formik2.values.username || ''}
                                    onChange={formik2.handleChange}
                                    onBlur={formik2.handleBlur}
                                    isInvalid={Boolean(formik2.errors.username && formik2.touched.username)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Form.Group controlId="formNombreEmpleado">
                                <Form.Label>Nombre Empleado</Form.Label>
                                <Form.Control
                                    name="nombre"
                                    type="text"
                                    value={formik2.values.nombre || ''}
                                    onChange={formik2.handleChange}
                                    onBlur={formik2.handleBlur}
                                    isInvalid={Boolean(formik2.errors.nombre && formik2.touched.nombre)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.nombre}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formApellido">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    name="apellido"
                                    type="text"
                                    value={formik2.values.apellido || ''}
                                    onChange={formik2.handleChange}
                                    onBlur={formik2.handleBlur}
                                    isInvalid={Boolean(formik2.errors.apellido && formik2.touched.apellido)}
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
                                    value={formik2.values.email || ''}
                                    onChange={formik2.handleChange}
                                    onBlur={formik2.handleBlur}
                                    isInvalid={Boolean(formik2.errors.email && formik2.touched.email)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formTelefono">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control
                                    name="telefono"
                                    type="number"
                                    value={formik2.values.telefono || ''}
                                    onChange={formik2.handleChange}
                                    onBlur={formik2.handleBlur}
                                    isInvalid={Boolean(formik2.errors.telefono && formik2.touched.telefono)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.telefono}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="text"
                                    value={formik2.values.password || ''}
                                    onChange={formik2.handleChange}
                                    onBlur={formik2.handleBlur}
                                    isInvalid={Boolean(formik2.errors.password && formik2.touched.password)} // chequear si con formik podemos verifica el password y su sintaxis probablemente la del back no haga falta
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formRol">
                                <Form.Label>Rol</Form.Label>
                                <Form.Control
                                    name="rol"
                                    type="text"
                                    value={formik2.values.rol || ''}
                                    onChange={formik2.handleChange}
                                    onBlur={formik2.handleBlur}
                                    isInvalid={Boolean(formik2.errors.rol && formik2.touched.rol)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.rol}
                                </Form.Control.Feedback>
                            </Form.Group>
                        
                            <Modal.Footer className="mt-4">
                                <Button variant="secondary" onClick={onHide}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" type="submit" disabled={!formik2.isValid}>
                                    Guardar
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
                
            )}
        </>
      )}

export default ModalEmpleado;
