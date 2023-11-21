export interface ProductoCocina{
    id:number;
    cantidad: number;
    tiempoEstimadoCocina: number;
    nombre:string;
    descripcion: string;
    foto:string;
    ingredienteDTOS: {
        ingredienteId: number;
        ingredienteNombre: string;
        ingredienteUnidadDeMedida: string;
        cantidad: number;
    }[];    
    denominacion:string;
    receta:string;
}