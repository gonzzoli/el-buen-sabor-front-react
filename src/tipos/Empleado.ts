import { Domicilio } from "./Domicilio"
import { Usuario } from "./Usuario";

export interface Empleado {
   id: number,
   fecha_alta: (Date | null),
   fecha_modificacion: (Date | null),
   deleted: (boolean | null),
   nombre: string,
   apellido: string,
   telefono: string,
   email: string,
   domicilios: Domicilio[],
   usuario: (Usuario | null),
}

