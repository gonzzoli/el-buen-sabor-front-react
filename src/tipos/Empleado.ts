import { Domicilio } from "./Domicilio"
import { Usuario } from "./Usuario";

export interface Empleado {
   id: number,
   nombre: string,
   apellido: string,
   telefono: string,
   email: string,
   domicilios: Domicilio[],
   usuario: (Usuario | null),
}

