import { useContext, useEffect, useState } from "react";
import { ClienteDTOMA } from  "../../tipos/DTOClienteMA";
import { ClienteDTOMC } from  "../../tipos/DTOClienteMC";
import { Cliente } from  "../../tipos/Cliente";
import { ClienteService } from "../../sevicios/ClienteServicio";
import Loader from "../Loader/Loader";
import ClienteModal from "../Funcion/ClienteModal";
import { ModalType } from "../../tipos/ModalType";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import { Button, Table } from "react-bootstrap";
import { SessionContext } from "../../context/SessionContext";
import { Rol } from "../../tipos/Rol";
import "../../estilos_generales.scss";



const TablaCliente = () => {

    //Variable que va a contener los datos recibidos por la API
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const sessionContext = useContext(SessionContext);
    //const sessionContext = useContext(SessionContext);
//Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);
//Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
     const [refreshData, setRefreshData] = useState(false);


//Este hook se va a ejecutar cada vez que se renderize el componente
    useEffect(() => {
        //Llamamos a la funcion para obtener todos los clientes declarado en el service
        const buscarClientes = async () => {
            const clientes = await ClienteService.mostrarClientes(sessionContext.jwtToken);
            setClientes(clientes);	
            setIsLoading(false);
        };

        buscarClientes();

    }, [refreshData]);


//Test, este log esta modificado para que muestre los datos de una manera mas legible
    console.log(JSON.stringify(clientes, null, 2));

     //Se inicializa un producto vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
   const initializeNewCliente = (): Cliente => {
       return {
        id: 0,
        username: "",
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
    /*type Cliente ={
        username: string;
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        password: string;
        id:number;
    };
    type ClienteDTOMA ={
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        rol: Rol;
    }*/

    //Logica del DTO

    const cambioaDTO = ( cliente: Cliente) => {
        const clienteDTO: ClienteDTOMA ={
            id: cliente.id,    
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            telefono: cliente.telefono,
            email: cliente.email,
            //rol: Rol.CLIENTE
        }
        return clienteDTO;
    };


    return(
        <>
    <div className="m-3">
        {isLoading ? <Loader /> : (
            <Table hover>
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
                            <td> <EditButton onClick={() => handleClick("Editar Cliente", cliente, ModalType.UPDATE)}/> </td>
                            <td> <DeleteButton onClick={() => handleClick("Borrar Cliente", cliente, ModalType.DELETE)} /> </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
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

    <Button className="boton-primario" href="/Domicilio">Editar Domicilio
    </Button>
   
</div>

    </>
    )
}



export default TablaCliente;
