import { PropsWithChildren } from "react"


const FondoModal = ({children}: PropsWithChildren) => {
    return (
        <div className="fondo_oscuro">
            {children}
        </div>
    )
}

export default FondoModal