//enumeraciones
export enum TipoRubro{
    bebida= 'BEBIDA',
    cocina='COCINA',
}
export enum EstadoRubro{
    activo='ACTIVO',
    inactivo='INACTIVO',
}

export interface Rubro {
        ingredienteRubro: string;
        id: number;
        nombreRubro: String;
        tipoRubro: TipoRubro;
        estado: EstadoRubro;
    
}