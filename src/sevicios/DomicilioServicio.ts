import { Domicilio } from "../tipos/Domicilio";

const BASE_URL = 'http://localhost:8080/api/v1';


  
 /* fetch(`${BASE_URL}/domicilios`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));*/

    export const DomicilioService = {

    
        getDomicilios: async (token:string): Promise<Domicilio[]> => {
    
            const response = await fetch(`${BASE_URL}/domicilios/mostrarDomicilioscliente`,{
            headers: {
                'Authorization': 'Bearer '+ token,
            },
        });

        const data = await response.json();
            return data;
        },
    
        
        getDomicilio: async (id:number, ): Promise<Domicilio> => {
            
            const response = await fetch (`${BASE_URL}/domicilios/mostrarDomicilioscliente/${id}`,{
            method: 'GET',
            redirect: 'follow'});
            const data = await response.json();
            return data;
            
        },
    
        createDomicilio:async (domicilio: Domicilio, token :string) => {
            console.log('createDomicilio',domicilio)
            const response = await fetch(`${BASE_URL}/domicilios`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(domicilio)
            });
    
            const data = await response.json();
            return data;
            
        },
    
        updateDomicilio: async (id: number, domicilio: Domicilio, token: string): Promise<Domicilio> => {
            
            const response = await fetch(`${BASE_URL}/domicilios/${id}`, {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer '+ token,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(domicilio)
            });
    
            const data = await response.json();
            return data;
        },
    
        
    
        deleteDomicilio: async (id:number): Promise<void> => {
            await fetch(`${BASE_URL}/domicilios/${id}`, {
                method: "DELETE"
            });
        }
        
    
      
    }
