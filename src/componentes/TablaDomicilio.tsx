import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../tipos/ModalType";
import Loader from "./Loader/Loader";
import { EditButton } from "./EditButton/EditButton";
import DeleteButton from "./DeleteButton/DeleteButton";
import { Domicilio } from "../tipos/Domicilio";
import { DomicilioService } from "../sevicios/DomicilioServicio";
import ModalDomicilio from "./modalDomicilio";

const TablaDomicilio = () => {

        /* Variable que va a contener los datos recibidos por la API*/
        const [domicilios, setDomicilios] = useState<Domicilio[]>([]);
  
        /* Variable que muestra el Loader(spinner) hasta que se reciban los datos provenientes de la API */
        const [isLoading, setIsLoading] = useState(true);
    
        /* Variable que va a actualizar los datos de la tabla luego de cada operación exitosa*/
        const [refreshData, setRefreshData] = useState(false);


        /* Hook que se va a ejecutar cada vez que se renderice el componente o 'refreshData' cambie de estado*/ 
        useEffect( () => {
            
            /* Llamada a la función para obtener todos los productos declarados en el ProductoService */
            const buscarDomicilio = async () => {
                const domicilios = await DomicilioService.getDomicilios();
                setDomicilios(domicilios);
                setIsLoading(false);
            }

            buscarDomicilio();
        }, [refreshData] 
        );

        /* Test, este log está modificado para que muestre los datos de una manera más legible (se muestra en la consola en formato JSON, sirve para verificar) */
        console.log(JSON.stringify(domicilios, null, 2));

        /* Const para inicializar un producto por defecto y evitar el "undefined" */
        //Creamos un producto nuevo para depositar los datos a cargar aquí
        
        const initializableDomicilioNuevo = (): Domicilio => {
            return {
                id: 0,
                calle: "",
                numero: "",
                localidad: "",
            };
        };

        /* Producto seleccionado que se va a pasar como un Prop al Modal */
        const [domicilio, setDomicilio] = useState<Domicilio>(initializableDomicilioNuevo);

        /* Const para manejar el estado del Modal */
        const [showModal, setShowModal] = useState(false);
        const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
        const [title, setTitle] = useState("");

        /* Lógica del Modal */
        const handleClick = (newTitle:string, dom:Domicilio, modal:ModalType) => {
            setTitle(newTitle);
            setModalType(modal);
            setDomicilio(dom);
            setShowModal(true);
        };


    return (
        <>
            <Button onClick={() => handleClick("Nuevo domicilio", initializableDomicilioNuevo(), ModalType.CREATE)}> Nuevo domicilio </Button>
            {
                isLoading ? <Loader/> : (
                    <Table hover>
                    <thead>
                        <tr>
                            <th> ID </th> 
                            <th> calle</th>
                            <th> numero </th>
                            <th> localidad </th>
                            <th> Editar </th>
                            <th> Eliminar </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            domicilios.map (domicilio => (
                                <tr key={domicilio.id}>
                                    <td>{domicilio.id}</td>
                                    <td>{domicilio.calle}</td>
                                    <td>{domicilio.numero}</td>
                                    <td>{domicilio.localidad}</td>


                                    <td> <EditButton onClick={() => handleClick("Editar Domicilio", domicilio, ModalType.UPDATE)}/> </td>
                                    <td> <DeleteButton onClick={() => handleClick("Borrar Domicilio", domicilio, ModalType.DELETE)}/> </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                ) 
            }
            {showModal && (
                <ModalDomicilio
                show={showModal}
                onHide={() => setShowModal(false)}
                title={title}
                modalType={modalType}
                domicilio={domicilio}
                refreshData={setRefreshData}
                />
            )}
        </>
    )
}
export default TablaDomicilio