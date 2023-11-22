import { Producto } from "../tipos/Producto";


const BASE_URL = 'https://buensabor-api.onrender.com'
//const BASE_URL = 'http://localhost:8080' 

/*
Usar la URL de RENDER o sino también probar por localhost:8080, cualquiera de las dos debería funcionar
*/

/*
Acá es donde se va a conectar a la Base de Datos
*/
export const ProductoService = {

    /* Metodos ABM */

    agregarProducto:async (producto: Producto, token: string) => {

        const response = await fetch(`${BASE_URL}/api/v1/productos/agregarProducto`, {          //Puede que haya que cambiar la ruta (Funciona)
            method: "POST",
            headers: {
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        const data = await response.json();
    
        return data;
    },

    eliminarProducto:async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/productos/${id}`, {         //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl (Funciona, igual hay problemas con el id de Rubro)
            method: "DELETE"
        });
    },

    modificarProducto:async (id:number, producto:Producto, token: string): Promise<Producto> => {
        const response = await fetch(`${BASE_URL}/api/v1/productos/${id}` , {           //Esta ruta igual se puede mantener, ya que esta mapeando con BaseControllerImpl (Funciona)
            method: "PUT",
            headers: {
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        const data = await response.json();
        return data;
    },

    verProductos:async (token: string): Promise<Producto[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/productos`, {
            headers: {
                'Authorization': 'Bearer '+ token,
            },
        });

        const data = await response.json();
        
        return data;
    }

    

}