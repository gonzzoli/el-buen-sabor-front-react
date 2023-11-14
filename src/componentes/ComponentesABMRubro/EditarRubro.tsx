import { PencilFill } from "react-bootstrap-icons";

interface EditarRubroProps{
    onClick: ()=>void;
}
export const EditarRubro=({onClick}:EditarRubroProps)=>{
    return(
        <PencilFill
            color="#FBC02D"
            size={24}
            onClick={onClick}
            onMouseEnter={() =>{document.body.style.cursor='pointer'}}
            onMouseLeave={() =>{document.body.style.cursor='default'}}
        />
    )
}
export default EditarRubro;