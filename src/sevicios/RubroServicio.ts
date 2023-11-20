import { Rubro } from "../tipos/Rubro";
const BASE_URL = 'http://localhost:8080';
export const RubroService = {
    
    /* Metodos ABM */

    agregarRubro:async (rubro: Rubro) => {
        //aca
        const response = await fetch(`${BASE_URL}/api/v1/rubros/agregarRubro`, {          
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rubro)
        });
        const data = await response.json();
    
        return data;
    },

    eliminarRubro:async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/rubros/${id}`, {         //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl
            method: "DELETE"
        });
    },

    modificarRubro:async (id:number, rubro: Rubro): Promise<Rubro> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubros/modificarRubro/${id}` , {           //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl (Funciona)
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rubro)
        });
        const data = await response.json();
        return data;
    },
//cambiarle el nombre
    buscarRubrosPorNombre:async (): Promise<Rubro[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubros`);
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