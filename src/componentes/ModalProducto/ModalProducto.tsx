import { Button, Form, Modal } from "react-bootstrap";
import { Producto } from "../../tipos/Producto";
import { ModalType } from "../../tipos/ModalType";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";

/* Dependencias para importar formularios */ 
import * as Yup from "yup";
import { useFormik } from "formik";
import { ProductoService } from "../../sevicios/ProductoServicio";

/* Notificaciones al usuario */
import { toast } from "react-toastify";

/* Estilos */ 
import 'bootstrap/dist/css/bootstrap.min.css';



type ModalProductoProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    producto: Producto;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalProducto = ({show, onHide, title, modalType, producto, refreshData}: ModalProductoProps) => {

    const sessionContext = useContext(SessionContext);
    
    const handleSaveUpdate =async (prod:Producto) => {

        /* Crear - Actualizar Producto */
        try {
            const isNew = prod.id === 0;
            if (isNew) {
                await ProductoService.agregarProducto(prod, sessionContext.jwtToken);
            } else {
                await ProductoService.modificarProducto(prod.id, prod, sessionContext.jwtToken);                     //Hay un problema que es que pierde el id de Rubro cuando se modifica
            }
            toast.success(isNew ? "Producto Creado" : "Producto Actualizado", {
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
            await ProductoService.eliminarProducto(producto.id, sessionContext.jwtToken);
            toast.success("Producto eliminado con éxito", {
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
            nombre: Yup.string().required('El nombre es requerido'),
            precio: Yup.number().required('El precio es requerido'),
            descripcion: Yup.string().required('La descripción es requerida'),
            idRubro: Yup.number().required('El rubro es requerido'),
            foto: Yup.string().required('La URL de la imagen es requerida'),
            receta: Yup.string().required('La receta es requerida'),
            // con el boolean en teoria no hace falta hacer un required
        });
    };
    /* Formik, utiliza el esquema de validación para crear un formulario dinámico y que lo bloquee en caso de errores */
    const formik = useFormik({
        initialValues: producto,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Producto) => handleSaveUpdate(obj),
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
                    <strong> {producto.nombre} </strong> ? </p>
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
                        
                        {/* Nombre Producto */}
                        <Form.Group controlId="formNombreProducto">
                            <Form.Label>Nombre Producto</Form.Label>
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

                        {/* Descripción */}
                        <Form.Group controlId="formDescripcion">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                name="descripcion"
                                type="text"
                                value={formik.values.descripcion || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.descripcion && formik.touched.descripcion)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.descripcion}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Precio */}
                        <Form.Group controlId="formPrecio">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                name="precio"
                                type="number"
                                value={formik.values.precio || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.precio && formik.touched.precio)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.precio}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Receta */}
                        <Form.Group controlId="formReceta">
                            <Form.Label>Receta</Form.Label>
                            <Form.Control
                                name="receta"
                                type="text"
                                value={formik.values.receta || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.receta && formik.touched.receta)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.receta}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Rubro */}
                        <Form.Group controlId="formIdRubro">
                            <Form.Label>Rubro</Form.Label>
                            <Form.Control
                                name="idRubro"
                                type="number"
                                value={formik.values.idRubro || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.idRubro && formik.touched.idRubro)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.idRubro}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Foto */}
                        <Form.Group controlId="formFoto">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                name="foto"
                                type="text"
                                value={formik.values.foto || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.foto && formik.touched.foto)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.foto}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Estado */}
                        <Form.Group controlId="formEstado">
                            <Form.Label>Estado</Form.Label>
                            <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                            </div>
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

export default ModalProducto