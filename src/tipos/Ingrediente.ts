export enum UnidadMedida{
    litros= 'LITROS',
    unidades= 'UNIDADES',
}

export interface Ingrediente {
    id: number;
    nombre: string;
    costo: number;
    stockActual: number;
    stockMinimo: number;
    foto: string;
    unidadMedida: UnidadMedida | null;   
}