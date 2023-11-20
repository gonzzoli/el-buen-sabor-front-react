import { Cliente } from "../tipos/Cliente";
import { ClienteDTOMA } from "../tipos/DTOClienteMA";
import { ClienteDTOMC } from "../tipos/DTOClienteMC";

//const BASE_URL = 'https://buensabor-api.onrender.com'
 const BASE_URL = 'http://localhost:8080' 

export const ClienteService = {

    
    mostrarClientes: async (): Promise<Cliente[]> => {
       
        const response = await fetch(`${BASE_URL}/api/v1/cliente/mostrarclientes`);
        const data = await response.json();
        return data;
    },

    
    datosCliente: async (id:number): Promise<Cliente> => {

        const response = await fetch (`${BASE_URL}/api/v1/cliente/verDatos/${id}`);
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
        
        const response = await fetch(`${BASE_URL}/api/v1/cliente/modificarDatos`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(clienteDTO)
        });

        const data = await response.json();
        return data;
    },

    modificarCliente: async (clienteDTO: ClienteDTOMA): Promise<Cliente> => {
        
        const response = await fetch(`${BASE_URL}/api/v1/cliente/modificarCliente`, {
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