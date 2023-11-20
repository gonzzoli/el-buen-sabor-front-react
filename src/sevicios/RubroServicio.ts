import { Rubro } from "../tipos/Rubro";
const BASE_URL = 'http://localhost:8080';
export const RubroService = {
    
    /* Metodos ABM */

<<<<<<< HEAD
    agregarRubro:async (rubro: Rubro, token:string) => {
=======
    agregarRubro:async (rubro: Rubro) => {
>>>>>>> 399da792f01996198179001e0d35d2ad7bafc21e
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

    eliminarRubro:async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/rubros/${id}`, {         //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl
            method: "DELETE"
        });
    },

<<<<<<< HEAD
    modificarRubro:async (id:number, rubro: Rubro, token:string): Promise<Rubro> => {
=======
    modificarRubro:async (id:number, rubro: Rubro): Promise<Rubro> => {
>>>>>>> 399da792f01996198179001e0d35d2ad7bafc21e
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
<<<<<<< HEAD
    buscarRubrosPorNombre:async (token:string): Promise<Rubro[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubros`, {          
=======
    buscarRubrosPorNombre:async (): Promise<Rubro[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/rubros`);
        const data = await response.json();
>>>>>>> 399da792f01996198179001e0d35d2ad7bafc21e
        
            headers: {
                "Authorization": "Bearer "+token,
                
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