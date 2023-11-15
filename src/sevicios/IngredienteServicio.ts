import { Ingrediente } from "../tipos/Ingrediente";

const BASE_URL = 'https://buensabor-api.onrender.com';

export const IngredienteServicio = {

    
    getIngredientes: async (): Promise<Ingrediente[]> => {
       
        const response = await fetch(`${BASE_URL}/api/v1/ingredientes`);
        const data = await response.json();
        return data;
    },

    
    getIngrediente: async (id:number): Promise<Ingrediente> => {

        const response = await fetch (`${BASE_URL}/api/v1/ingredientes/${id}`);
        const data = await response.json();
        return data;
        
    },

    createIngrediente:async (ingrediente:Ingrediente):Promise<Ingrediente> => {

        const response = await fetch(`${BASE_URL}/api/v1/ingredientes`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingrediente)
        });

        const data = await response.json();
        return data;
        
    },

    updateIngrediente: async (id: number, ingrediente: Ingrediente): Promise<Ingrediente> => {
        
        const response = await fetch(`${BASE_URL}/api/v1/ingredientes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(ingrediente)
        });

        const data = await response.json();
        return data;
    },

    

    deleteIngrediente: async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/ingredientes/${id}`, {
            method: "DELETE"
        });
    }
}