
export enum EstadoPedido{
    aConfirmar='A CONFIRMAR',
    aPreparar='A PREPARAR',
    iniciado='INICIADO',
    entregado='ENTREGADO',
    
}

export interface PedidoCocina {
    id:number;
    fecha: Date;
    estadoPedido: EstadoPedido;
    productosCocina: string;
}