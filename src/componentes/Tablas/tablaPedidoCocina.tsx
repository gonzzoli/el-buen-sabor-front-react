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




const PedidoCocinaTable = () => {

    const [pedidos, setPedidos] = useState<PedidoCocina[]>([]);
    const sessionContext = useContext(SessionContext);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);


    useEffect(() => {
        //Llamamos a la funcion para obtener todos los productos declarado en el service
        const fetchPedidos = async () => {
            const pedidos = await PedidoCocinaService.getPedidosCocina();
            setPedidos(pedidos);
            //setIsLoading(false);
        }


        fetchPedidos();
    }, [refreshData]);

    //console.log(JSON.stringify(pedidos, null, 2));

    const initializeNewPedidoCocina = (): PedidoCocina => {
        return {
          id: 0,
          fecha: new Date(),
          estadoPedido: EstadoPedido.aPreparar,
          productosCocina: " "
    };
    };  

    const [pedido, setPedido] = useState<PedidoCocina>(initializeNewPedidoCocina);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    const handleClick = (newTitle: string, ped: PedidoCocina, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setPedido(ped);
        setShowModal(true);
    };

    return (
        <>

    <Button onClick={() => handleClick("Nuevo Pedido", initializeNewPedidoCocina(), ModalType.CREATE)}> Nuevo Pedido Cocina </Button>
        
    {isLoading ? <Loader /> : (
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
                        pedidos.map (pedido =>  (
                            <tr key={pedido.id}>
                                <td>{pedido.fecha.toString()}</td>
                                <td>{pedido.estadoPedido}</td>
                                <td>{pedido.productosCocina}</td>
                                <td> <EditButton onClick={() => handleClick("Editar Producto", pedido, ModalType.UPDATE)}/> </td>
                                <td> <DeleteButton onClick={() => handleClick("Borrar Producto", pedido, ModalType.DELETE)}/> </td>
                             </tr>   
                        ))
                    }
                 </tbody>
                 </Table>       
    )}
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

}


export default PedidoCocinaTable
