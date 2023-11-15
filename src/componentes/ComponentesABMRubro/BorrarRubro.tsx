import { TrashFill } from "react-bootstrap-icons";

interface BorrarRubroProps{
    onClick: ()=>void;
}
export const BorrarRubro=({onClick}:BorrarRubroProps)=>{
    return(
        <TrashFill
            color= "black"
            size={24}
            onClick={onClick}
            onMouseEnter={() =>{document.body.style.cursor='pointer'}}
            onMouseLeave={() =>{document.body.style.cursor='default'}}
        />
    )
}
export default BorrarRubro