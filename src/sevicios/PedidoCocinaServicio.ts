import { pedidoCocina } from '../tipos/PedidoCocinaDTO';


const BASE_URL = 'api/v1/pedido';


export const PedidoCocinaService = {
    
    getPedidosCocina: async (): Promise<pedidoCocina[]> => {
        const response = await fetch(`${BASE_URL}/produbuscarPedidosAPreparar`);
        const data = await response.json();
        return data;
    },

    getProduct: async (id: number): Promise<Product> => {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        const data = await response.json();
        return data;
    },



    editarEstado: async (pageable: Pageable, productoCocinaDTO: ProductoCocinaDTO): Promise<void> => {
        await fetch(`${BASE_URL}/editarEstado}`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                body: JSON.stringify({ pageable, productoCocinaDTO }),

            }
        });
    }


};
