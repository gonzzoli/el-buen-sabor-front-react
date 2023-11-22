import { PedidoCocina } from '../tipos/PedidoCocinaDTO';


const BASE_URL = 'https://buensabor-api.onrender.com';
//const BASE_URL = 'https://localhost:8080';



export const PedidoCocinaService = {
    
    getPedidosCocina: async (): Promise<PedidoCocina[]> => {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/api/v1/pedidos/buscarPedidosAPreparar`);
        const data = await response.json();
        return data;
    },

    
  //  getProduct: async (id: number): Promise<Product> => {
   //     const response = await fetch(`${BASE_URL}/products/${id}`);
     //   const data = await response.json();
      //  return data;
    //},

    eliminarPedido:async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/pedidos/${id}`, {   
            method: "DELETE"
        });
    },

    

    editarEstado: async (pedidoCocina: PedidoCocina): Promise<PedidoCocina> => {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/editarEstado/${pedidoCocina}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pedidoCocina)
                });
                const data = await response.json();
                return data;
            },
        

};
