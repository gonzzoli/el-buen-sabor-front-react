import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { domicilio } from "../tipos/Producto";
import { EstadoProducto } from "../tipos/EstadoProdoucto";
import { ProductoService } from "../../sevicios/ProductoServicio";
import { ModalType } from "../../tipos/ModalType";
import ModalProducto from "../ModalProducto/ModalProducto";
import Loader from "../Loader/Loader";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { Domicilio } from "../tipos/Domicilio";
import { DomicilioService } from "../sevicios/DomicilioServicio";

const TablaProductos = () => {

        /* Variable que va a contener los datos recibidos por la API*/
        const [domicilio, setDomicilio] = useState<Domicilio[]>([]);
  
        /* Variable que muestra el Loader(spinner) hasta que se reciban los datos provenientes de la API */
        const [isLoading, setIsLoading] = useState(true);
    
        /* Variable que va a actualizar los datos de la tabla luego de cada operación exitosa*/
        const [refreshData, setRefreshData] = useState(false);


        /* Hook que se va a ejecutar cada vez que se renderice el componente o 'refreshData' cambie de estado*/ 
        useEffect( () => {
            
            /* Llamada a la función para obtener todos los productos declarados en el ProductoService */
            const buscarDomicilio = async () => {
                const productos = await DomicilioService.verDomicilio();
                setDomicilio(domicilio);
                setIsLoading(false);
            }

            buscardomicilio();
        }, [refreshData] 
        );

        /* Test, este log está modificado para que muestre los datos de una manera más legible (se muestra en la consola en formato JSON, sirve para verificar) */
        console.log(JSON.stringify(domicilio, null, 2));

        /* Const para inicializar un producto por defecto y evitar el "undefined" */
        //Creamos un producto nuevo para depositar los datos a cargar aquí
        
        const initializableProductoNuevo = (): Domicilio => {
            return {
                id: 0,
                calle: "",
                numero: 0,
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
        const handleClick = (newTitle:string, <dom:Domicilio></dom:Domicilio>, modal:ModalType) => {
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
                            domicilio.map (domicilio) => (
                                <tr key={domicilio.id}>
                                    <td>{domicilio.id}</td>
                                    <td>{domicilio.nombre}</td>
                                    <td>${domicilio.precio}</td>
                                    <td>{domicilio.descripcion}</td>
                                    <td>{domicilio.receta}</td>
                                    <td>{domicilio.idRubro}</td>
                                    <td>{domicilio.estado}</td>
                                    <td><img src={domicilio.foto} alt={domicilio.nombre} style={{width: '150px'}}/></td>
                                    <td> <EditButton onClick={() => handleClick("Editar Producto", domicilio, ModalType.UPDATE)}/> </td>
                                    <td> <DeleteButton onClick={() => handleClick("Borrar Producto", domicilio, ModalType.DELETE)}/> </td>
                                </tr>
                            ))
                    </tbody>
                    </Table>
                ) 
            }
            {showModal && (
                <ModalProducto
                show={showModal}
                onHide={() => setShowModal(false)}
                title={title}
                modalType={modalType}
                producto={producto}
                refreshData={setRefreshData}
                />
            )}
        </>
    )
}
export default TablaProductos 