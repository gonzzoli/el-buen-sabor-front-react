import { Cliente } from "../tipos/Cliente";
import { ClienteDTOMA } from "../tipos/DTOClienteMA";
import { ClienteDTOMC } from "../tipos/DTOClienteMC";

const BASE_URL = 'https://buensabor-api.onrender.com'
 //const BASE_URL = 'http://localhost:8080' 

export const ClienteService = {

    
    mostrarClientes: async (token: string): Promise<Cliente[]> => {
       
        const response = await fetch(`${BASE_URL}/api/v1/clientes/mostrarclientes`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer'+ token,
        }
    });
        
        const data = await response.json();
        return data;
    },

    
    datosCliente: async (id:number): Promise<Cliente> => {

        const response = await fetch (`${BASE_URL}/api/v1/clientes/verDatos/${id}`);
        const data = await response.json();
        return data;
    },

    saveCliente:async (cliente:Cliente):Promise<Cliente> => {
        console.log(cliente)
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

    modificardatos: async (token: string, id: number, clienteDTO: ClienteDTOMC): Promise<Cliente> => {
        
        const response = await fetch(`${BASE_URL}/api/v1/clientes/modificarDatos`, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer'+ token,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(clienteDTO)
        });

        const data = await response.json();
        return data;
    },

    modificarCliente: async (clienteDTO: ClienteDTOMA, token: string): Promise<Cliente> => {
        
        const response = await fetch(`${BASE_URL}/api/v1/clientes/modificarCliente`, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer '+ token,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(clienteDTO)
        });

        const data = await response.json();
        return data;
    },

    

    deleteCliente: async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/clientes/${id}`, {
            method: "DELETE"
        });
    },


    
    updateCliente: async (id: number, cliente: Cliente): Promise<Cliente> => {
        const response = await fetch(`${BASE_URL}/api/v1/clientes/${id}`, {  // chequear rutas
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cliente)
                });
                const data = await response.json();
                return data;
            }
            

}