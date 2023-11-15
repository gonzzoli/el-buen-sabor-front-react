import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Producto } from "../../tipos/Producto";
import { EstadoProducto } from "../../tipos/EstadoProducto";
import { ProductoService } from "../../sevicios/ProductoServicio";
import { ModalType } from "../../tipos/ModalType";
import ModalProducto from "../ModalProducto/ModalProducto";
import Loader from "../Loader/Loader";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";

const TablaProductos = () => {

        /* Variable que va a contener los datos recibidos por la API*/
        const [productos, setProductos] = useState<Producto[]>([]);
  
        /* Variable que muestra el Loader(spinner) hasta que se reciban los datos provenientes de la API */
        const [isLoading, setIsLoading] = useState(true);
    
        /* Variable que va a actualizar los datos de la tabla luego de cada operación exitosa*/
        const [refreshData, setRefreshData] = useState(false);


        /* Hook que se va a ejecutar cada vez que se renderice el componente o 'refreshData' cambie de estado*/ 
        useEffect( () => {
            
            /* Llamada a la función para obtener todos los productos declarados en el ProductoService */
            const buscarProductos = async () => {
                const productos = await ProductoService.verProductos();
                setProductos(productos);
                setIsLoading(false);
            }

            buscarProductos();
        }, [refreshData] 
        );

        /* Test, este log está modificado para que muestre los datos de una manera más legible (se muestra en la consola en formato JSON, sirve para verificar) */
        console.log(JSON.stringify(productos, null, 2));

        /* Const para inicializar un producto por defecto y evitar el "undefined" */
        //Creamos un producto nuevo para depositar los datos a cargar aquí
        
        const initializableProductoNuevo = (): Producto => {
            return {
                id: 0,
                nombre: "",
                descripcion: "",
                precio: 0,
                receta: "",
                tiempoEstimadoCocina: 0,
                idRubro: 0,                             //El rubro lo estoy subiendo antes por POSTMAN, habría que hacer un combobox
                foto: "",
                estado: EstadoProducto.inactivo,        //Agregar el switch de estado
                ingredienteDTOS: [{
                    "ingredienteId": 1,                 //Estoy harcodeando los ingredientes pq todavia no esta el ABM de ingredientes dentro de Producto
                    "cantidad": 3               
                }]
            };
        };

        /* Producto seleccionado que se va a pasar como un Prop al Modal */
        const [producto, setProducto] = useState<Producto>(initializableProductoNuevo);

        /* Const para manejar el estado del Modal */
        const [showModal, setShowModal] = useState(false);
        const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
        const [title, setTitle] = useState("");

        /* Lógica del Modal */
        const handleClick = (newTitle:string, prod:Producto, modal:ModalType) => {
            setTitle(newTitle);
            setModalType(modal);
            setProducto(prod);
            setShowModal(true);
        };


    return (
        <>
            <Button onClick={() => handleClick("Nuevo Producto", initializableProductoNuevo(), ModalType.CREATE)}> Nuevo Producto </Button>
            {
                isLoading ? <Loader/> : (
                    <Table hover>
                    <thead>
                        <tr>
                            <th> ID </th> 
                            <th> Nombre </th>
                            <th> Precio </th>
                            <th> Descripción </th>
                            <th> Receta </th>
                            <th> ID Rubro </th>
                            <th> Estado </th>
                            <th> Imagen </th>
                            <th> Editar </th>
                            <th> Eliminar </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map ( producto => (
                                <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td>${producto.precio}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>{producto.receta}</td>
                                    <td>{producto.idRubro}</td>
                                    <td>{producto.estado}</td>
                                    <td><img src={producto.foto} alt={producto.nombre} style={{width: '150px'}}/></td>
                                    <td> <EditButton onClick={() => handleClick("Editar Producto", producto, ModalType.UPDATE)}/> </td>
                                    <td> <DeleteButton onClick={() => handleClick("Borrar Producto", producto, ModalType.DELETE)}/> </td>
                                </tr>
                            ))
                        }
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