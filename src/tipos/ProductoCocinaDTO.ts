export interface ProductoCocina{
    id:number;
    cantidad: number;
    tiempoEstimadoCocina: number;
    nombre:string;
    descripcion: string;
    foto:string;
    ingredienteDTOS: {
        ingredienteId: number;
        cantidad: number;
    }[];    
    denominacion:string;
    receta:string;
}