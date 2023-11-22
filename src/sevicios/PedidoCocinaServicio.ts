import { PedidoCocina } from '../tipos/PedidoCocinaDTO';


const BASE_URL = 'https://buensabor-api.onrender.com';
//const BASE_URL = 'https://localhost:8080';



export const PedidoCocinaService = {
    agregarPedido: async (pedidoCocina: PedidoCocina) => {

        const response = await fetch(`${BASE_URL}/api/v1/pedidos`, { //CAMBIAR RUTA  
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedidoCocina)
        });
        const data = await response.json();

        return data;
    },
    editarEstado: async (pedidoCocina: PedidoCocina, token:string): Promise<PedidoCocina> => {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/editarEstado/${pedidoCocina}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer "+token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedidoCocina)
        });
        const data = await response.json();
        return data;
    },
    getPedidosCocina: async (token: string): Promise<PedidoCocina[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/pedidos/buscarPedidosAPreparar`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            },

        });
        console.log(response)
        const data = await response.json();
        return data;
    },

    //  getProduct: async (id: number): Promise<Product> => {
    //     const response = await fetch(`${BASE_URL}/products/${id}`);
    //   const data = await response.json();
    //  return data;
    //},



    eliminarPedido: async (id: number, token: string): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/pedidos/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            },
        });
    },
}
