//enumeraciones

export enum EstadoRubro{
    activo='ACTIVO',
    inactivo='INACTIVO',
}
export enum TipoRubro{
    cocina="COCINA",
    bebida="BEBIDA",
}

export interface Rubro {
        
        id: number;
        nombreRubro: String;
        estado: EstadoRubro;
        tipoRubro: TipoRubro;
    
}