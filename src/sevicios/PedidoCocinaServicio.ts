import { PedidoCocina } from '../tipos/PedidoCocinaDTO';


const BASE_URL = 'api/v1/pedido';


export const PedidoCocinaService = {
    
    getPedidosCocina: async (): Promise<PedidoCocina[]> => {
        const response = await fetch(`${BASE_URL}/produbuscarPedidosAPreparar`);
        const data = await response.json();
        return data;
    },

    
  //  getProduct: async (id: number): Promise<Product> => {
   //     const response = await fetch(`${BASE_URL}/products/${id}`);
     //   const data = await response.json();
      //  return data;
    //},



    editarEstado: async (pedidoCocina: PedidoCocina): Promise<PedidoCocina> => {
        const response = await fetch(`${BASE_URL}/editarEstado/${pedidoCocina}`, {
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
