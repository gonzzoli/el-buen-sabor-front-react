import { boolean } from "yup";
import { PedidoCocina } from "../../tipos/PedidoCocinaDTO";
import { ModalType } from "../../tipos/ModalType";
import { Button, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

type PedidoCocinaModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    ped: PedidoCocina;
}

const PedidoCocinaModal = ({ show, onHide, title, modalType, ped }: PedidoCocinaModalProps) => {

const validationSchema  = () => {
        return Yup.object().shape({
                id: Yup.number().integer().min(0),
                fecha: Yup.date().required('La fecha es requerida'),
                estadoPedido: Yup.string().required('El estado del pedido es requerido'),
                    productosCocina: Yup.array().of(
                            Yup.object().shape({
                            id: Yup.number().integer().min(0),
                            cantidad: Yup.number().integer().min(0).required('La cantidad es requerida'),
                            tiempoEstimadoCocina: Yup.number().integer().min(0).required('El tiempo estimado de cocina es requerido'),
                            nombre: Yup.string().required('El nombre es requerido'),
                            descripcion: Yup.string().required('La descripción es requerida'),
                            foto: Yup.string().required('La URL de la foto es requerida'),
                                ingredienteDTOS: Yup.array().of(
                                    Yup.object().shape({
                                    ingredienteId: Yup.string().required('El ID del ingrediente es requerido'),
                                    ingredienteNombre: Yup.string().required('El nombre del ingrediente es requerido'),
                                    ingredienteUnidadDeMedida: Yup.string().required('La unidad de medida del ingrediente es requerida'),
                                    cantidad: Yup.string().required('La cantidad del ingrediente es requerida'),
                                     })
                                ),
                            denominacion: Yup.string().required('La denominación es requerida'),
                            receta: Yup.string().required('La receta es requerida'),
                        })
                    ),
        });
};

 //Formik
 const formik = useFormik({
    initialValues: ped,
    validationSchema: validationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj: PedidoCocina) => handleSaveUpdate(obj),
  });



    return (

        <>
            {modalType === ModalType.DELETE ? (
                <>Por el momento lo dejamos vacio</>
            ) : (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form onSubmit={formik.handleSubmit}></Form>
                        <Form.Group controlId="formFecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                name="fecha"
                                type="date"
                                value={formik.values.fecha.toString() || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.fecha && formik.touched.fecha)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.fecha}
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
                    </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    )
}


export default PedidoCocinaModal;