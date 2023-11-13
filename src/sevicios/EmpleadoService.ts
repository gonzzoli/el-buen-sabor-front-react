import { Empleado } from "../tipos/Empleado";

const BASE_URL = 'URL de la API' 

/*
Usar la URL de RENDER o sino también probar por localhost:8080, cualquiera de las dos debería funcionar
*/

export const EmpleadoService = {

    registrarEmpleado:async (empleado: Empleado) => {

        const response = await fetch(`${BASE_URL}/api/v1/empleado/registrarEmpleado`, {          //Puede que haya que cambiar la ruta
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleado)
        });
        const data = await response.json();
    
        return data;
    }
}
