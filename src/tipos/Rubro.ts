//enumeraciones
enum TipoRubro{
    bebida= 'BEBIDA',
    cocina='COCINA',
}
enum EstadoRubro{
    activo='ACTIVO',
    inactivo='INACTIVO',
}

export interface Rubro {
        id: number;
        nombreRubro: String;
        tipoRubro: TipoRubro;
        estado: EstadoRubro;
    
}