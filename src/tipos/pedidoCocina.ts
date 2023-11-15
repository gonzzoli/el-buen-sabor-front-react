export enum EstadoPedido{
    aConfirmar='A CONFIRMAR',
    aPreparar='A PREPARAR',
    iniciado='INICIADO',
    entregado='ENTREGADO',
    
}

export interface pedidoCocina {
    id:number;
    fecha: Date;
    estadoPedido: EstadoPedido;
}