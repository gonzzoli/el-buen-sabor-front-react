import { boolean } from "yup";
import { PedidoCocina } from "../../tipos/PedidoCocinaDTO";
import { ModalType } from "../../tipos/ModalType";
import { Button, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PedidoCocinaService } from "../../sevicios/PedidoCocinaServicio";
import { useContext, useEffect } from "react";
import { SessionContext } from "../../context/SessionContext";
import { ProductoService } from "../../sevicios/ProductoServicio";
import { toast } from "react-toastify";

type PedidoCocinaModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    ped: PedidoCocina;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;

}

const ModalPedidoCocina = ({show, onHide, title, modalType, ped, refreshData}: PedidoCocinaModalProps) => {
    const sessionContext = useContext(SessionContext);


    const fetchPedidosCocina = async () => {
        try {
          const pedidos = await PedidoCocinaService.getPedidosCocina();
          
        } catch (error) {
            console.error('error en HandleSaveUpdate',error);
        } 
      };
    
      useEffect(() => {
        fetchPedidosCocina();
      }, []); // Fetch orders on component mount
    
      const handleEstadoPedidoChange = async (pedidoCocinaListo: PedidoCocina) => {
        try {
            const isNew = pedidoCocinaListo.id === 0;
        if (isNew) {
            await PedidoCocinaService.agregarPedido(pedidoCocinaListo);

        } else {
          await PedidoCocinaService.editarEstado(pedidoCocinaListo);
          fetchPedidosCocina();
        }
        toast.success(isNew ? "Rubro Creado" : "Rubro Actualizado", {
            position: "top-center",
        });
        onHide();
        refreshData(prevState => !prevState);
        } catch (error) {
          console.error('Error updating order status', error);
          setError('Error updating order status');
        }
      };
    
      const handleDelete =async () => {

        /* Borrar Producto */
        try {
            await ProductoService.eliminarProducto(ped.id);
            toast.success("Pedido eliminado con éxito", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error.");
        }
    }



    const validationSchema  = () => {
            return Yup.object().shape({
                    id: Yup.number().integer().min(0),
                    fecha: Yup.date().required('La fecha es requerida'),
                    estadoPedido: Yup.string().required('El estado del pedido es requerido'),
                    productosCocina: Yup.string().required('Se requieren los productos del pedido'),   
                    });
    
    };

        //Formik
        const formik = useFormik({
            initialValues: ped,
            validationSchema: validationSchema(),
            validateOnChange: true,
            validateOnBlur: true,
            onSubmit: (values) => handleEstadoPedidoChange(values),
            
        });

{/* 
    function handleDelete(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error("Function not implemented.");}
*/}



    return (

        <>
            {modalType === ModalType.DELETE ? (
                <>
                <Modal show={show} onHide={onHide} centered backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title> {title} </Modal.Title>
                        <Modal.Body>
                            <p>¿Está seguro que desea eliminar <br/>
                            <strong> {ped.id} </strong> ? </p>
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
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="formFecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                name="fecha"
                                type="text"
                                value={formik.values.fecha.toISOString().substring(0, 10)}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.fecha && formik.touched.fecha)}
                            />
                            <Form.Control.Feedback type="invalid">
                              { /* {formik.errors.fecha.toISOString().substring(0, 10)}*/}
                            </Form.Control.Feedback>
                            
                        </Form.Group>

                        <Form.Group controlId="formEstado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                name="estadoPedido"
                                type="text"
                                value={formik.values.estadoPedido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.estadoPedido && formik.touched.estadoPedido)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.estadoPedido}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formProductos">
                            <Form.Label>Productos</Form.Label>
                            <Form.Control
                                name="productosCocina"
                                type="text"
                                value={formik.values.productosCocina}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.productosCocina && formik.touched.productosCocina)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.productosCocina}
                            </Form.Control.Feedback>
                        </Form.Group>

                    

                    </Form>

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


export default ModalPedidoCocina;

function onHide() {
    throw new Error("Function not implemented.");
}

function setError(arg0: string) {
    throw new Error("Function not implemented.");
}

