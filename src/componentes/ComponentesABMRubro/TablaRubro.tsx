import { useEffect, useState } from "react";
import { EstadoRubro,TipoRubro, Rubro } from "../../tipos/Rubro";
import { RubroService } from "../../sevicios/RubroServicio";
import "../../estilos_generales.scss";
import { Button, Table } from "react-bootstrap";
//import Loader from "./Loader/Spinner";

import {ModalType} from "../../tipos/ModalType";
import { EditarRubro } from "../ComponentesABMRubro/EditarRubro";
import { BorrarRubro } from "../ComponentesABMRubro/BorrarRubro";
import RubroModal from "./RubroModal";


const TablaRubro = () => {

    //Variable que va a contener los datos recibidos por la API
    const [rubros, setRubros] = useState<Rubro[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
   // const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
    useEffect(() => {

        //Llamamos a la función para obtener todos los rubros declarado en el service
        const fetchRubros = async () => {
            const rubros = await RubroService.buscarRubrosPorNombre();
            setRubros(rubros);
           // setIsLoading(false);
        };

        fetchRubros();
    }, [refreshData]);

    //Test, este log está modificado para que muestre los datos de una manera más legible
    console.log(JSON.stringify(rubros, null, 2));


    //Se inicializa un producto vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
        const initializeNewRubro = (): Rubro => {
        return {
            id: 0,
            nombreRubro: "",
            estado: EstadoRubro.activo,
            tipoRubro: TipoRubro.cocina,
            };
    };

    //Producto seleccionado que se va a pasar como prop al Modal
        const [rubro, setRubro] = useState<Rubro>(initializeNewRubro);
    
    //Manejo de Modal
        const [showModal, setShowModal] = useState(false);
        const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
        const [title, setTitle] = useState("");

    //Logica de Modal
        const handleClick = (newTitle: string, rub: Rubro, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal);
        setRubro(rub);
        setShowModal(true);
    };


  return (
    <>
    <div className="m-3">

        {/* Botón para que cuando el admin haga click llame a la función que declaramos */}
            <Button className= "boton-primario mb-4" onClick={() => handleClick("Nuevo Rubro",
                initializeNewRubro(), ModalType.CREATE)}>
                Nuevo Rubro
            </Button>
            

    {/*{isLoading ? <Loader/>: (*/}
           
        <Table hover>
            <thead>
                <tr className="tabla-titulo-columna" >
                    <th className="tabla-titulo-columna"> RUBRO </th>
                    <th className="tabla-titulo-columna"> TIPO RUBRO </th>
                    <th className="tabla-titulo-columna"> ESTADO </th>
                    <th className="tabla-titulo-columna"> EDITAR </th>
                    <th className="tabla-titulo-columna"> BORRAR </th>
                </tr>
            </thead>
            <tbody>
                {rubros.map(rubro=> (
                    <tr key={rubro.id}>
                        <td className="celda"> {rubro.nombreRubro} </td>
                        <td className="celda"> {rubro.tipoRubro} </td>
                        <td className="celda"> {rubro.estado} </td>
                        <td className="celda"> <EditarRubro onClick={() => handleClick("Editar rubro", rubro, ModalType.UPDATE)}/> </td>
                        <td className="celda"> <BorrarRubro onClick={() => handleClick("Borrar rubro", rubro, ModalType.DELETE)} /> </td>
                    </tr>
                ))}
            </tbody>

        </Table>

    

    {showModal && (
        <RubroModal
        show = {showModal}
        onHide={() => setShowModal(false)}
        title={title}
        modalType={modalType}
        rubro={rubro}
        refreshData={setRefreshData}
        />

   
    )}

    
    </div>
    </>
  )
}

export default TablaRubro