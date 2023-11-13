export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    receta: string;
    idRubro: number;
    foto: string;
    estado: boolean;
    //Faltaría Ingredientes.
}