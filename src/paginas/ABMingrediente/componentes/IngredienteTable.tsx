import { useEffect, useState } from "react";
import { Ingrediente } from "../../../tipos/Ingrediente";
import { IngredienteServicio } from "../../../sevicios/IngredienteServicio"
//import Loader from "../Loader/Loader";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../../../tipos/ModalType";
import IngredienteModal from "./IngredienteModal";
//import EditButton from "./EditButton/EditButton.tsx";
//import DeleteButton from "./DeleteButton/DeleteButton.tsx";
import React from "react";

const initializeNewIngrediente = (): Ingrediente => {
    return {
        id: 0,
        nombre: "",
        costo: 0,
        stockActual: 0,
        stockMinimo: 0,
        foto: "",
        // unidadMedida: +++++++++++++++
    };
};

/* Variable que va a actualizar los datos de la tabla luego de cada operación exitosa*/
const [refreshData, setRefreshData] = useState(false);


//Producto seleccionado que se va a pasar como prop al Modal
const [ingrediente, setIngrediente] = useState<Ingrediente>(initializeNewIngrediente);

//Manejo de Modal
const [showModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
const [tittle, setNombre] = useState("");

//Logica de Modal
const handleClick = (newTittle: string, ingrediente: Ingrediente, modal: ModalType) => {
    setNombre(newTittle);
    setModalType(modal)
    setIngrediente(ingrediente);
    setShowModal(true);
};




const IngredienteTable = () => {

    //Variable que va a contener los datos recibidos por la API
    const [ingrediente, setIngrediente] = useState<Ingrediente[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);


    //Este hook se va a ejecutar cada vez que se renderize el componente
    useEffect(() => {

        //Llamamos a la funcion para obtener todos los ingredientes declarado en el service
        const fetchIngrediente = async () => {
            const ingrediente = await IngredienteService.getIngrediente();
            setIngrediente(ingrediente);
            setIsLoading(false);
        };

        fetchIngrediente();

    }, [refreshData]
    );

    //Test, este log esta modificado para que muestre los datos de una manera mas legible
    console.log(JSON.stringify(ingrediente, null, 2));
    return (
        <>
            <Button onClick={() => handleClick("Nuevo Ingrediente", initializeNewIngrediente(), ModalType.CREATE)}>
                Nuevo Ingrediente
            </Button>

            {isLoading ? (
                <Loader />
            ) : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Costo</th>
                            <th>Stock Actual</th>
                            <th>Stock Minimo</th>
                            <th>Unidad Medida</th>
                            <th>Imagen</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingrediente.map(ingrediente => (
                            <tr key={ingrediente.id}>
                                <td>{ingrediente.nombre}</td>
                                <td>{ingrediente.costo}</td>
                                <td>{ingrediente.stockActual}</td>
                                <td>{ingrediente.stockMinimo}</td>
                                <td>{ingrediente.unidadMedida}</td>
                                <td><img src={ingrediente.foto} alt={ingrediente.nombre} style={{ width: '50px' }} /></td>
                                <td><EditButton onClick={() => handleClick("Editar Ingrediente", ingrediente, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Borrar INgrediente", ingrediente, ModalType.DELETE)} /></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
            )
            }
            {showModal && (
                <IngredienteModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    ingr={ingrediente}
                    refreshData={setRefreshData}
                />
            )}
        </>
    )
}

export default IngredienteTable;