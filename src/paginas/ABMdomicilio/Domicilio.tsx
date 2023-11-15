import Button from 'react-bootstrap/Button';
import { Table} from 'react-bootstrap';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Formulario from '../../componentes/formulario';
import { Domicilio } from '../../tipos/Domicilio';
import { DomicilioService } from '../../sevicios/DomicilioServicio';
import Formulariomod from '../../componentes/formularioMod';

/*interface DomicilioProps{
    id: number;
    calle:string,
    numero: number,
    localidad:string,
}*/
//const Domicilio: React.FC<DomicilioProps> = ({calle,numero, localidad,}) => {
   
    

//formulario de cargar nuevo domicilio
function ModalComponent() {
  const [show, setShow] = useState(false);

  const handleClose = ()  => setShow(false);
  const guardarDatos = async (paramsDomicilio: Domicilio)  => {
    //llamar a funcion 
    await DomicilioService.createDomicilio(paramsDomicilio)
    console.log('guardar',paramsDomicilio)
    setShow(false)
  }
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        cargar nuevo formulario
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo domicilio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formulario/>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => guardarDatos({id:1,
        calle:'San Lorenzo',
        numero: 170,
        localidad:'Ciudad',})}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
} 
//fin formulario cargar nuevo domicilio


//formulario modificar domicilio
function ModalComponent2() {
  const [show2, setShow2] = useState(false);

  const handleClose2 = ()  => setShow2(false);
  const guardarDatos2 = async (paramsDomicilio: Domicilio)  => {
    //llamar a funcion 
    await DomicilioService.createDomicilio(paramsDomicilio)
    console.log('guardar',paramsDomicilio)
    setShow2(false)
  }

  const handleShow2 = () => setShow2(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow2}>
        Modificar formulario
      </Button>

      <Modal show2={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar direccion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formulariomod/>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => guardarDatos2({
                       id:1,
                        calle:'San Lorenzo',
                        numero: 170,
                        localidad:'Ciudad',})}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
} 
//fin formulario de modificar domicilio

const Domicilio = () => {
 const datos =[
     {
        id:1,
        calle:'San Lorenzo',
        numero: 170,
        localidad:'Ciudad',
    },
    {
        id:2,
        calle:'San Martin Sur ',
        numero: 487,
        localidad:'Godoy Cruz',
    },
    {
        id:1,
        calle:'Reconquista',
        numero: 170,
        localidad:'Godoy Cruz',
    }
]
const [modalVisible, handleShow] = useState(false);

  const handleNuevoDomicilioClick = () => {
    handleShow(true);
  };
  const [modalVisible2, handleShow2] = useState(false);
  
  const handleNuevoDomicilioClick2 = () => {
    handleShow2(true);
  };
  return (

            <div>
            <Button 
            variant="success" 
            style={{ marginBottom: '15px' }}
            onClick={handleNuevoDomicilioClick}>
                Generar Nuevo Domicilio
            </Button>

            <Table striped bordered style={{ marginBottom: '15px' }}>
                <thead style={{ backgroundColor: '#ffeeba' }}>
                <tr>
                    <th style={{ border: '1px solid #000000' }}>Id</th>
                    <th style={{ border: '1px solid #000000' }}>Calle</th>
                    <th style={{ border: '1px solid #000000' }}>Numero</th>
                    <th style={{ border: '1px solid #000000' }}>Localidad</th>
                    <th style={{ border: '1px solid #000000' }}>Modificar</th>
                    <th style={{ border: '1px solid #000000' }}>Eliminar</th>
                </tr>
                </thead>
                <tbody>
        {datos.map((fila) => (
          <tr key={fila.id}>
            <td style={{ border: '1px solid #000000' }}>{fila.id}</td>
            <td style={{ border: '1px solid #000000' }}>{fila.calle}</td>
            <td style={{ border: '1px solid #000000' }}>{fila.numero}</td>
            <td style={{ border: '1px solid #000000' }}>{fila.localidad}</td>
            <td style={{ border: '1px solid #000000' }}>
              <Button variant="info" onClick={handleNuevoDomicilioClick2}>Modificar</Button>
            </td>
            <td style={{ border: '1px solid #000000' }}>
              <Button variant="danger" >Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
            </Table>
            {modalVisible && <ModalComponent />}
            {modalVisible2 && <ModalComponent2 />}
            </div>

  );
};

export default Domicilio;