import { useEffect, useState } from "react";
import { EstadoPedido, PedidoCocina } from "../../tipos/PedidoCocinaDTO";
import { PedidoCocinaService } from "../../sevicios/PedidoCocinaServicio";
import Loader from "../Loader/Loader";
import { Table } from "react-bootstrap";
import EditButton from "../Botones/DeleteButton";
import { Button } from "react-bootstrap";
import { ModalType } from "../../tipos/ModalType";



const PedidoCocinaTable = () => {

    const [pedidos, setPedidos] = useState<PedidoCocina[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //Llamamos a la funcion para obtener todos los productos declarado en el service
        const fetchPedidos = async () => {
            const pedidos = await PedidoCocinaService.getPedidosCocina();
            setPedidos(pedidos);
            setIsLoading(false);
        };


        fetchPedidos();


    }, []);

    console.log(JSON.stringify(pedidos, null, 2));

    const initializeNewPedidoCocina = (): PedidoCocina => {
        return {
          id: 0,
          fecha: new Date(),
          estadoPedido: EstadoPedido.aPreparar,
          productosCocina: [
            {
              id: 0,
              cantidad: 0,
              tiempoEstimadoCocina: 0,
              nombre: " ",
              descripcion: " ",
              foto: " ",
              ingredienteDTOS: [
                {
                  ingredienteId: 0,
                  ingredienteNombre: " ",
                  ingredienteUnidadDeMedida: " ",
                  cantidad:0 ,
                }
              ],
              denominacion: " ",
              receta: " ",
            }
          ],
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
        
        <Button onClick={() => handleClick("Pedidos Cocina", initializeNewPedidoCocina(), ModalType.NONE)}>
                Pedidos Cocina
            </Button>

            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th> Fecha</th>
                            <th>EstadoPedido</th>
                            <th>Productos</th>
                            <th> Marcar Como Listo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(pedido => (
                            <tr key={pedido.id}>
                                <td>{pedido.fecha.toString()}</td>
                                <td>{pedido.estadoPedido}</td>
                                <td>
                                    {/* Mapea cada producto a un elemento JSX */}
                                    {pedido.productosCocina.map((producto, index) => (
                                        <div key={index}>
                                            {/* Renderiza la información del producto, por ejemplo: */}
                                            <p>{producto.nombre}</p>
                                            <p>{producto.cantidad}</p>
                                            <p>{producto.tiempoEstimadoCocina}</p>
                                            <p>{producto.descripcion}</p>
                                            <p>{producto.foto}</p>
                                            <ul>
                                                {producto.ingredienteDTOS.map((ingrediente, ingredienteIndex) => (
                                                    <li key={ingredienteIndex}>
                                                        {ingrediente.ingredienteNombre}: {ingrediente.cantidad} {ingrediente.ingredienteUnidadDeMedida}
                                                    </li>
                                                ))}
                                            </ul>                                       
                                        </div>
                                    ))}
                                </td>
                                <td> <EditButton onClick={() => handleClick("Editar Estado", pedido, ModalType.UPDATEMA)} /> </td>
                            </tr>
                        )
                        )

                        }
                    </tbody>
                </Table>
            )
        
    )
}


export default PedidoCocinaTable;

}