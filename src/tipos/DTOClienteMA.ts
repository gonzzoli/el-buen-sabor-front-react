import { Rol } from "./Rol";

export interface ClienteDTOMA {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    rol: Rol;
    //Falta Domicilio que se va a hacer de otra manera
    }