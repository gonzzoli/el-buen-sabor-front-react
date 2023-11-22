import { Domicilio } from "./Domicilio"
import { Rol } from "./Rol";

export interface Empleado {
   id: number,
   nombre: string,
   apellido: string,
   telefono: string,
   email: string,
   domicilio: (Domicilio| null),
   password: string,
   rol: Rol
}

