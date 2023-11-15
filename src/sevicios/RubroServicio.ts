import { Rubro } from "../tipos/Rubro";
const BASE_URL = 'https://ebsreact-persist.onrender.com';
export const RubroService = {
    
    /* Metodos ABM */

    agregarRubro:async (rubro: Rubro) => {

        const response = await fetch(`${BASE_URL}/api/v1/rubros/agregarRubro`, {          //Puede que haya que cambiar la ruta, igual desde el POSTMAN funciona
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
        const response = await fetch(`${BASE_URL}/api/v1/rubros/${id}` , {           //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl (Funciona)
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rubro)
        });
        const data = await response.json();
        return data;
    },

    buscarRubrosPorNombre:async (): Promise<Rubro[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubros/Nombre`);
        const data = await response.json();
        
        return data;
    }

    

}