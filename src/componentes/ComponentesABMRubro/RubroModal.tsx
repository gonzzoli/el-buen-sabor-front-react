
import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../tipos/ModalType";

//Dependencias para validar los formularios
import * as Yup from "yup";
import { useFormik } from "formik";

import { RubroService} from "../../sevicios/RubroServicio"

//Notificaciones al usuario
import { toast } from 'react-toastify';
import { Rubro } from "../../tipos/Rubro";




//Recibe parametros como props para que se renderice, su titulo y según qué operación queremos realizar.
type RubroModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    rubro: Rubro;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
    
};





const RubroModal = ({show, onHide, title, rubro, modalType, refreshData}:RubroModalProps) => {

    //CREATE-UPDATE función handleSaveUpdate 
    const handleSaveUpdate = async (rub:Rubro) => {
    try {
        const isNew = rub.id === 0;
        if (isNew) {
            await RubroService.createRubro(rub);
        } else {
            await RubroService.updateRubro(rub.id, rub);
        }
        toast.success(isNew ? "Rubro Creado" : "Rubro Actualizado", {
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
        await RubroService.deleteRubro(rubro.id);
        toast.success("Rubro borrado", {
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
            nombreRubro: Yup.string().required('El nombre es requerido'),
            estado: Yup.string().required('El estado es requerido'),
            ingredienteRelacionado: Yup.string().required('El ingrediente relacionado es requerido'),
       
        });
    };
    

//Formik -  Utiliza el esquema de validación de YUP y obtiene un formulario dinámico que
// bloquea el formulario en caso de haber errores.
    const formik = useFormik({
        initialValues: rubro,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Rubro) => handleSaveUpdate(obj),
     });



        return(
            <>

            {modalType === ModalType.DELETE ? (
                <>

                <Modal show={show} onHide={onHide} centered backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                

                    <Modal.Body>
                        <p> ¿Está seguro que desea eliminar el rubro   
                            <br /> <strong> {rubro.nombreRubro} </strong> ?
                        </p>
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

                    {/*"Formulario"*/}
                    <Form onSubmit={formik.handleSubmit}>
                        
                    {/*"NOMBRE DEL RUBRO"*/}
                    <Form.Group controlId="formNombreRubro">
                            <Form.Label>Nombre Rubro</Form.Label>
                            <Form.Control
                                name="nombreRubro"
                                type="text"
                                value={formik.values.nombreRubro.toString() || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.nombreRubro && formik.touched.nombreRubro)}
                            />
                            {/*<Form.Control.Feedback type="invalid">
                                {formik.errors.nombreRubro}
            </Form.Control.Feedback> */}
                        </Form.Group>


                    {/*"ESTADO"*/}                
                        <Form.Group controlId="formEstadoRubro">
                            <Form.Label>Estado:</Form.Label>
                            <Form.Control
                                name="estadoRubro"
                                type="text"
                                value={formik.values.estado || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.estado &&
                                formik.touched.estado)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.estado}
                             </Form.Control.Feedback>
                        </Form.Group>
                    
                    {/*"INGREDIENTE RELACIONADO"*/}                
                        <Form.Group controlId="formIngrediente">
                            <Form.Label>Ingrediente relacionado:</Form.Label>
                            <Form.Control
                                name="ingredienteRubro"
                                type="text"
                                value={formik.values.ingredienteRubro || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.ingredienteRubro &&
                                formik.touched.ingredienteRubro)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.ingredienteRubro}
                             </Form.Control.Feedback>
                        </Form.Group>
                    

                            <Modal.Footer className="mt-4">
                                
                                <Button variant="secondary" onClick={onHide}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" type="submit" disabled={!formik.isValid}>
                                    Confirmar
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

export default RubroModal;