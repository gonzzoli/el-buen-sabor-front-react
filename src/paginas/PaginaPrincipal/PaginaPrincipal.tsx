import { useEffect, useState } from "react"
import './PaginaPrincipal.scss'

const PaginaPrincipal: React.FC = () => {
    const [productos, setProductos] = useState([])
    
    useEffect(() => {
        async function traerProductos() {
            const respuesta = fetch(`${import.meta.env.URL_API}/api/productos/paginaPrincipal`)
        }

        traerProductos()
    }, [])
    return (
        <>
        
        </>
    )
}

export default PaginaPrincipal