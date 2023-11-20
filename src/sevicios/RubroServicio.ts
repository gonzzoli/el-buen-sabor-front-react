import { Rubro } from "../tipos/Rubro";

export const RubroService = {
    
    /* Metodos ABM */

    agregarRubro:async (rubro: Rubro, token:string) => {
        //aca
        const response = await fetch(import.meta.env.LOCAL_URL+"/rubros/agregarRubro", {          
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+token
                
            },
            body: JSON.stringify(rubro)
        });
        const data = await response.json();
    
        return data;
    },

    eliminarRubro:async (id:number): Promise<void> => {
        await fetch(import.meta.env.LOCAL_URL+`/rubros/${id}`, {         //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl
            method: "DELETE"
        });
    },

    modificarRubro:async (id:number, rubro: Rubro, token:string): Promise<Rubro> => {
        const response = await fetch(import.meta.env.LOCAL_URL+`/rubros/modificarRubro/${id}` , {           //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl (Funciona)
            method: "PUT",
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rubro)
        });
        const data = await response.json();
        return data;
    },
//cambiarle el nombre
    buscarRubrosPorNombre:async (token:string): Promise<Rubro[]> => {
        const response = await fetch(import.meta.env.LOCAL_URL+`/rubros`, {          
            headers: {
                "Authorization": "Bearer "+token,
            }, 
        });
        const data = await response.json();
        return data;
    }



    

}