import { Domicilio } from "./Domicilio"
import { Rol } from "./Rol";
import { Usuario } from "./Usuario";

export interface Empleado {
   id: number,
   username: string;
   nombre: string,
   apellido: string,
   telefono: string,
   email: string,
   domicilio: (Domicilio| null),
   password: string,
   rol: Rol
}

