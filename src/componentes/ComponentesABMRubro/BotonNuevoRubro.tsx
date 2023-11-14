import { Button } from "react-bootstrap";
import { useState } from "react";

export const BotonNuevoRubro = () => {
      //Color inicial del boton
      const [buttonColor, setButtonColor] = useState("#f1bd2d");

      //Manejo del Modal
      const [showModal, setShowModal] = useState(false);
  
      //Funcion para cambiar el color del boton
      const handleColorChange = (color: string) => {
          setButtonColor(color);
      };
  
      //Al hacer en el boton se muestra el Modal
      const handleShowModal = () => {
          setShowModal(true);
      }
  return (
    <Button variant= "primary" style={{backgroundColor: buttonColor}}
    onClick={handleShowModal}>
        Nuevo Rubro
    </Button>
  )
}
  
export default BotonNuevoRubro;