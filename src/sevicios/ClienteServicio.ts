import { Cliente } from "../tipos/Cliente";
import { ClienteDTOMA } from "../tipos/DTOClienteMA";
import { ClienteDTOMC } from "../tipos/DTOClienteMC";

const BASE_URL = 'api/v1/cliente' 

export const ClienteService = {

    
    mostrarClientes: async (): Promise<Cliente[]> => {
       
        const response = await fetch(`${BASE_URL}/mostrarclientes`);
        const data = await response.json();
        return data;
    },

    
    datosCliente: async (id:number): Promise<Cliente> => {

        const response = await fetch (`${BASE_URL}/verDatos/${id}`);
        const data = await response.json();
        return data;
        
    },

    saveCliente:async (cliente:Cliente):Promise<Cliente> => {
        const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/registerCliente`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        const data = await response.json();
        return data;
        
    },

    modificardatos: async (id: number, clienteDTO: ClienteDTOMC): Promise<Cliente> => {
        
        const response = await fetch(`${BASE_URL}/modificarDatos`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(clienteDTO)
        });

        const data = await response.json();
        return data;
    },

    modificarCliente: async (id: number, clienteDTO: ClienteDTOMA): Promise<Cliente> => {
        
        const response = await fetch(`${BASE_URL}/modificarCliente`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(clienteDTO)
        });

        const data = await response.json();
        return data;
    },

    

    deleteCliente: async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        });
    }
}