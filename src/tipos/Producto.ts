import { EstadoProducto } from "./EstadoProducto";

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    receta: string;
    tiempoEstimadoCocina: number;
    idRubro: number;
    foto: string;
    estado: EstadoProducto;
    ingredientes: []
}