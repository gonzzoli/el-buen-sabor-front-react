export enum UnidadMedida{
    litros= 'LITROS',
    unidadeS= 'UNIDADES',
}

export interface Ingrediente {
    id?: number;
    nombre: string;
    costo: number;
    stockActual: number;
    stockMinimo: number;
    foto: string;
    unidadm: UnidadMedida;   
}