import { Domicilio } from "./Domicilio"
import { Rol } from "./Rol";
import { Usuario } from "./Usuario";

export interface Empleado {
   id: number,
   nombre: string,
   apellido: string,
   telefono: string,
   email: string,
   domicilios: (Domicilio| null),
   password: string,
   rol: Rol
}

