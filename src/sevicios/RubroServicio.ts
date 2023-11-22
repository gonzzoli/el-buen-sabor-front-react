import { Rubro } from "../tipos/Rubro";
const BASE_URL = import.meta.env.VITE_URL_API_sinv1;
export const RubroService = {
    
    /* Metodos ABM */

    agregarRubro:async (rubro: Rubro, token:string) => {
        //aca
        const response = await fetch(`${BASE_URL}/api/v1/rubros/agregarRubro`, {          
            method: "POST",
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rubro)
        });
        const data = await response.json();
    
        return data;
    },

    eliminarRubro:async (id:number, token:string): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/rubros/${id}`, {         //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl
            method: "DELETE",
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json'
            },
        });
    },

    modificarRubro:async (id:number, rubro: Rubro, token:string): Promise<Rubro> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubros/modificarRubro/${id}` , {           //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl (Funciona)
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
        const response = await fetch(`${BASE_URL}/api/v1/rubros`, {          
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json'
            },
            
        });
        const data = await response.json();
        return data;
    }

   // mostrarRubro: async (id:number): Promise<void> => {
    //    const response = await fetch(`${BASE_URL}/api/v1/rubros/${id}`, {         //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl
          //  method: "GET"
     //   });
       // const rubro = await response.json();
        //console.log("Rubro obtenido:", rubro);
   // }



    

}