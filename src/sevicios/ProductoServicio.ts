import { Producto } from "../tipos/Producto";

const BASE_URL = 'URL de la API' 

/*
Usar la URL de RENDER o sino también probar por localhost:8080, cualquiera de las dos debería funcionar
*/

export const ProductoService = {

    agregarProducto:async (producto: Producto) => {

        const response = await fetch(`${BASE_URL}/api/v1/productos/agregarProducto`, {          //Puede que haya que cambiar la ruta
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        const data = await response.json();
    
        return data;
    }

}