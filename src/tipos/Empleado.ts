import { Domicilio } from "./Domicilio"
import { Usuario } from "./Usuario";

export interface Empleado{
            id: number,
            fecha_alta: Date,
            fecha_modificacion: Date,
            deleted: boolean,
            nombre: string,
            apellido: string,
            telefono: string,
            email: string,
            domicilios: Domicilio[],
           usuario: Usuario,
        }
    
  