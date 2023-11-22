import { Empleado } from "../tipos/Empleado";

const BASE_URL = 'https://buensabor-api.onrender.com' 

/*
Usar la URL de RENDER o sino también probar por localhost:8080, cualquiera de las dos debería funcionar
*/

export const EmpleadoService = {

    registrarEmpleado:async (empleado: Empleado, token:string) => {
        console.log(empleado);
        const response = await fetch(`${import.meta.env.VITE_URL_API}/empleado/registrarEmpleado`, {          //Puede que haya que cambiar la ruta
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleado)
        });
        const data = await response.json();
    
        return data;
    },

    getEmpleados: async (): Promise<Empleado[]> => {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/empleado`);
        const data = await response.json();
        return data;
    },
    getEmpleado: async (id: number): Promise<Empleado> => {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/empleado/${id}`); //chequear rutas
                const data = await response.json();
                return data;
            },

    updateEmpleado: async (empleado: Empleado): Promise<Empleado> => {
                const response = await fetch(`${import.meta.env.VITE_URL_API}/empleado/modificarDatosEmpleado`, {  // chequear rutas
                            method: "PUT",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(empleado)
                        });
                        const data = await response.json();
                        return data;
                    },
                    

     deleteEmpleado: async (id: number): Promise<void> => {
                      await fetch(`${import.meta.env.VITE_URL_API}/empleado/${id}`, {
                            method: "DELETE"
                        });
                    }
                
                
        

}
