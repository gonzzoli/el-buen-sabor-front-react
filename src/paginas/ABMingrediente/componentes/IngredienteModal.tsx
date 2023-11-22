import { Button, Form, Modal } from "react-bootstrap";
import { Ingrediente } from "../../../tipos/Ingrediente";
import { ModalType } from "../../../tipos/ModalType";
import { IngredienteServicio } from "../../../sevicios/IngredienteServicio";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from 'react-toastify';


type IngredienteModalProps = {
    show: boolean;
    onHide: () => void;
    title: string
    modalType: ModalType;
    ingr: Ingrediente;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};


const IngredienteModal = ({ show, onHide, title, modalType, ingr, refreshData }: IngredienteModalProps) => {
    //CREATE - UPDATE
    const handleSaveUpdate = async (ingr: Ingrediente) => {
        try {
            const isNew = ingr.id === 0;
            if (isNew) {
                await IngredienteServicio.createIngrediente(ingr);
            } else {
                await IngredienteServicio.updateIngrediente(ingr.id, ingr);
            }
            toast.success(isNew ? "Ingrediente Creado" : "Ingrediente Actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error');
        }
    };
    const handleDelete = async () => {
        try {
            await IngredienteServicio.deleteIngrediente(ingr.id);
            toast.success("Ingrediente Borrado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error');
        }
    }

    //Yup
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            nombre: Yup.string().required('El nombre es requerido'),
            costo: Yup.number().min(0).required('El costo es requerido'),
            stockActual: Yup.number().required('El stock actual es requerida'),
            stockMinimo: Yup.number().required('El stock minimo es requerida'),
            foto: Yup.string().required('La URL de la imagen es requerida'),
            unidadMedida: Yup.string().required('La unidad de medida es requerida'),
        });
    };

    //Formik
    const formik = useFormik({
        initialValues: ingr,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Ingrediente) => handleSaveUpdate(obj),
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
                            <p>¿Está seguro que desea eliminar el Ingrediente?<br /><strong>{ingr.nombre}</strong>?</p>
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
                                {/*Debajo de la etiqueta Form, vamos a armar un <Form.Group> por cada uno de los campos para dar de alta o modificar un producto. */}
                                <Form.Group controlId="formTitulo">
                                    <Form.Label>Nombre</Form.Label>
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

                                <Form.Group controlId="formCosto">
                                    <Form.Label>Costo</Form.Label>
                                    <Form.Control
                                        name="costo"
                                        type="number"
                                        value={formik.values.costo || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.costo && formik.touched.costo)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.costo}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formStockActual">
                                    <Form.Label>StockActual</Form.Label>
                                    <Form.Control
                                        name="stockActual"
                                        type="number"
                                        value={formik.values.stockActual || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockActual && formik.touched.stockActual)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockActual}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formStockMinimo">
                                    <Form.Label>stockMinimo</Form.Label>
                                    <Form.Control
                                        name="stockMinimo"
                                        type="number"
                                        value={formik.values.stockMinimo || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockMinimo && formik.touched.stockMinimo)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockMinimo}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formFoto">
                                    <Form.Label>Foto</Form.Label>
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


                                <Form.Group controlId="formUnidadMedida">
                                    <Form.Label>Unidad Medida</Form.Label>
                                    <Form.Control
                                        name="UnidadMedida"
                                        type="text"
                                        value={formik.values.unidadMedida || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.unidadMedida && formik.touched.unidadMedida)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockActual}
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
            )
            }
        </>
    );
};

export default IngredienteModal;