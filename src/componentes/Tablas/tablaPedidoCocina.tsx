import { useContext, useEffect, useState } from "react";
import { EstadoPedido, PedidoCocina } from "../../tipos/PedidoCocinaDTO";
import { PedidoCocinaService } from "../../sevicios/PedidoCocinaServicio";
import Loader from "../Loader/Loader";
import { Table } from "react-bootstrap";
import EditButton from "../Botones/DeleteButton";
import { Button } from "react-bootstrap";
import { ModalType } from "../../tipos/ModalType";
import PedidoCocinaModal from "../../paginas/PedidoCocina/pedidoCocinaModal";
import { SessionContext } from "../../context/SessionContext";
import DeleteButton from "../DeleteButton";


const initializeNewPedidoCocina = (): PedidoCocina => {
    return {
        id: 0,
        fecha: new Date(),
        estadoPedido: EstadoPedido.aPreparar,
        productosCocina: " "
    };
};

const PedidoCocinaTable = () => {
    const [pedido, setPedido] = useState<PedidoCocina>(initializeNewPedidoCocina);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    const sessionContext = useContext(SessionContext);



    //CAMBIO
    //const [pedidos, setPedidos] = useState<PedidoCocina>(initializeNewPedidoCocina);
    const [pedidos, setPedidos] = useState<PedidoCocina[]>([]);
    //const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);


    useEffect(() => {
        //Llamamos a la funcion para obtener todos los productos declarado en el service
        const fetchPedidos = async () => {
            const pedidos = await PedidoCocinaService.getPedidosCocina(sessionContext.jwtToken);
            //CONSEGURIDAD: const pedidos = await PedidoCocinaService.getPedidosCocina(sessionContext.jwtToken);
            setPedidos(pedidos);
            //setIsLoading(false);
        }


        fetchPedidos();
    }, [refreshData])
    const handleClick = (newTitle: string, ped: PedidoCocina, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setPedido(ped);
        setShowModal(true);
    };

    return (
        <>
            {/*{isLoading ? <Loader/>: (*/}
            <Table hover>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Estado Pedido</th>
                        <th>Productos</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pedidos.map(pedido => (
                            <tr key={pedido.id}>
                                <td>{pedido.fecha.toString()}</td>
                                <td>{pedido.estadoPedido}</td>
                                <td>{pedido.productosCocina}</td>
                                <td> <EditButton onClick={() => handleClick("Editar Pedido", pedido, ModalType.UPDATE)} /> </td>
                                <td> <DeleteButton onClick={() => handleClick("Borrar Pedido", pedido, ModalType.DELETE)} /> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            {/*})}*/}
            {showModal && (
                <PedidoCocinaModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    ped={pedido}
                    refreshData={setRefreshData}
                />
            )}

        </>

    )
};



export default PedidoCocinaTable
