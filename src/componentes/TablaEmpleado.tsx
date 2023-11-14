import { useEffect, useState } from "react";
import { Empleado } from "../tipos/Empleado";
import { EmpleadoService } from "../sevicios/EmpleadoService";
import Loader from "../componentes/Loader/Loader.tsx";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../tipos/ModalType.ts";


const initializeNewEmpleado = (): Empleado => {
  return {
    id: 0,
    nombre: '',
    apellido: '',
    idUsuario: 0,
    telefono: '',
    email: ''
  };
};


//Empleado seleccionado que se va a pasar como prop al Modal
const [empleado, setEmpleado] = useState<Empleado>(initializeNewEmpleado);

//Manejo de Modal
const [showModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
const [title, setTitle] = useState("");


//Logica de Modal
const handleClick = (newTitle: string, empl: Empleado, modal: ModalType) => {
  setTitle(newTitle);
  setModalType(modal)
  setEmpleado(empl);
  setShowModal(true);
};


const TablaEmpleado = () => {


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


    }, []);


//Test, este log esta modificado para que muestre los datos de una manera mas legible
    console.log(JSON.stringify(empleados, null, 2));
    
    return(
        <>
        <Button onClick={() => handleClick("Nuevo Empleado", initializeNewEmpleado(), ModalType.CREATE)}>
                Nuevo Producto
            </Button>

        {isLoading ? <Loader /> : (
          
            <Table hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>idUsuario</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map(empleado => (
                        <tr key={empleado.id}>
                            <td>{empleado.nombre}</td>
                            <td>{empleado.apellido}</td>
                            <td>{empleado.email}</td>
                            <td>{empleado.telefono}</td>
                            <td>{empleado.idUsuario}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
        </>
    )

}


export default TablaEmpleado;
