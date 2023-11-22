import { Rubro } from "../tipos/Rubro";


export const RubroService = {
   
    /* Metodos ABM */

    agregarRubro:async (rubro: Rubro, token:string) => {
        //aca
        const response = await fetch(`${import.meta.env.VITE_URL_API}/rubros/agregarRubro`, {          
            method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(rubro),
      });
      const data = await response.json();
      console.log(data);
    },
    

    eliminarRubro:async (id:number,token:string): Promise<void> => {
        await fetch(`${import.meta.env.VITE_URL_API}/rubros/${id}`, {         //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
        });
    },

    modificarRubro:async (id:number, rubro: Rubro, token:string): Promise<Rubro> => {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/rubros/modificarRubro/${id}` , {           //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl (Funciona)
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
            body: JSON.stringify(rubro)
        });
        const data = await response.json();
        return data;
    },
//cambiarle el nombre
    buscarRubrosPorNombre:async (token:string): Promise<Rubro[]> => {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/rubros`, {          
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }, 
        });
        const data = await response.json();
        return data;
    }



    

}