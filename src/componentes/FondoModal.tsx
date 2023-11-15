import { PropsWithChildren } from "react"


const FondoModal = ({children}: PropsWithChildren) => {
    return (
        <div className="fondo-modal">
            {children}
        </div>
    )
}

export default FondoModal