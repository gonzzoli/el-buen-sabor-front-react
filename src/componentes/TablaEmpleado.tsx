import { useEffect, useState } from "react";
import { Empleado } from "../tipos/Empleado";
import { EmpleadoService } from "../sevicios/EmpleadoService";
import Loader from "../componentes/Loader/Loader.tsx";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../tipos/ModalType.ts";
import ModalEmpleado from "./ModalEmpleado/ModalEmpleado.tsx";
import EditButton from "./EditButton/EditButton.tsx";
import DeleteButton from "./DeleteButton/DeleteButton.tsx";
import { Rol } from "../tipos/Rol.ts";



const TablaEmpleado = () => {
    const initializeNewEmpleado = (): Empleado => {
        return {
      
          //Aca esta el error, no me deja darle el tipo null a las fechas ni a el booleano deleted  ni al usuario asignado
          id: 0,
          nombre: '',
          apellido: '',
          telefono: '',
          email: '',
          domicilios: null,
          password: '',
          rol: Rol.Cajero
        };
      };
      
           
          
      //Empleado seleccionado que se va a pasar como prop al Modal
      const [empleado, setEmpleado] = useState<Empleado>(initializeNewEmpleado);
      
      //Manejo de Modal
      const [showModal, setShowModal] = useState(false);
      const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
      const [title, setTitle] = useState("");
      
      const [refreshData, setRefreshData] = useState(false);
      
      //Logica de Modal
      const handleClick = (newTitle: string, empl: Empleado, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setEmpleado(empl);
        setShowModal(true);
      };
      

    //Variable que va a contener los datos recibidos por la API
    const [empleados, setEmpleados] = useState<Empleado[]>([]);


//Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);


//Este hook se va a ejecutar cada vez que se renderize el componente
    useEffect(() => {


//Llamamos a la funcion para obtener todos los productos declarado en el service
        const fetchEmpleados = async () => {
            const empleados = await EmpleadoService.getEmpleados();
            setEmpleados(empleados);	
          setIsLoading(false);
        };


        fetchEmpleados();


    }, [refreshData]);


//Test, este log esta modificado para que muestre los datos de una manera mas legible
    console.log(JSON.stringify(empleados, null, 2));
    
    return (
        <>
            <Button onClick={() => handleClick("Nuevo Empleado", initializeNewEmpleado(), ModalType.CREATE)}>
                Nuevo Empleado
            </Button>
    
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                {/* <th>Domicilio</th>
                                <th>Usuario</th> */}
                                <th>Editar</th>
                                <th>Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map(empleado => (
                                <tr key={empleado.id}>
                                    <td>{empleado.id}</td>
                                    <td>{empleado.nombre}</td>
                                    <td>{empleado.apellido}</td>
                                    <td>{empleado.email}</td>
                                    <td>{empleado.telefono}</td>
                                    {/* <td>{empleado.domicilios}</td>
                                    <td>{empleado.usuario}</td> */}
                                                                                                                                 

                                <td><EditButton onClick={() => handleClick("Editar Empleado", empleado, ModalType.UPDATE)}/></td>
                                <td><DeleteButton onClick={() => handleClick("Borrar Empleado", empleado, ModalType.DELETE)}/></td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
    
                    {showModal && (
                        <ModalEmpleado
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            title={title}
                            modalType={modalType}
                            empl={empleado}
                            refreshData={setRefreshData}
                        />
                    )}
                </>
            )}
        </>
    );
}
    export default TablaEmpleado;