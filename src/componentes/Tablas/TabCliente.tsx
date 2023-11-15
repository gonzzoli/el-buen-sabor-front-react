import { useEffect, useState } from "react";
import { ClienteDTOMA } from  "../../tipos/DTOClienteMA";
import { ClienteDTOMC } from  "../../tipos/DTOClienteMC";
import { Cliente } from  "../../tipos/Cliente";
import { ClienteService } from "../../sevicios/ClienteServicio";
import Loader from "../Loader/Loader";
import ClienteModal from "../Funcion/ClienteModal";
import { ModalType } from "../../tipos/ModalType";
import EditButton from "../Botones/DeleteButton";
import DeleteButton from "../Botones/DeleteButton";
import { Button } from "react-bootstrap";



const TablaCliente = () => {

    //Variable que va a contener los datos recibidos por la API
    const [clientes, setClientes] = useState<Cliente[]>([]);


//Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);
//Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
     const [refreshData, setRefreshData] = useState(false);


//Este hook se va a ejecutar cada vez que se renderize el componente
    useEffect(() => {
        //Llamamos a la funcion para obtener todos los clientes declarado en el service
        const fetchClientes = async () => {
            const clientes = await ClienteService.mostrarClientes();
            setClientes(clientes);	
            setIsLoading(false);
        };

        fetchClientes();

    }, []);


//Test, este log esta modificado para que muestre los datos de una manera mas legible
    console.log(JSON.stringify(clientes, null, 2));

     //Se inicializa un producto vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
   const initializeNewCliente = (): Cliente => {
       return {
        id: 0,
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        password:"",
        rol:"Cliente"
        };
    };
    const [cliente, setCliente] = useState<Cliente> (initializeNewCliente);
    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");


    //Logica de Modal
    const handleClick = (newTitle: string, cliente: Cliente , modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setCliente(cliente);
        setShowModal(true);
    };

    
    return(
        <>
    <div className="m-3">
        {isLoading ? <Loader /> : (
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Telefono</th>
                        <th>Email</th>
                        <th> EDITAR</th>
                        <th> BORRAR </th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.email}</td>
                            <td> <EditButton onClick={() => handleClick("Editar Cliente", cliente, ModalType.UPDATEMA)}/> </td>
                            <td> <DeleteButton onClick={() => handleClick("Borrar Cliente", cliente, ModalType.DELETE)} /> </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        )}
         
         {showModal && (
        <ClienteModal 
        show = {showModal}
        onHide={() => setShowModal(false)}
        title={title}
        modalType={modalType}
        cliente={cliente}
        refreshData={setRefreshData}
        /> 
        )}


    {/* Botón para que cuando el usuario haga click llame a la función que declaramos */}
    <Button onClick={() => handleClick("Nuevo Cliente",
        initializeNewCliente(), ModalType.CREATE)}>
        Nuevo Cliente
    </Button>
    
</div>

    </>
    )
}



export default TablaCliente;
