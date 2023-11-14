import { Empleado } from "../tipos/Empleado";
import * as React from 'react';
import DataLayer from "../lib/data-layer";
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

type EmpleadoTableProps = {
    empleados: Empleado[];
  };

  const emptyEmpleado: Empleado = {
    id: 0,
    nombre: '',
    apellido: '',
    idUsuario: 0,
    telefono: '',
    email: ''
  };
  

  ///TODAVIA ESTA EN PROCESO

  
  const TablaEmpleado: React.FC<EmpleadoTableProps> = ({ empleados }) => {
    // State
  const [error, setError] = React.useState<any>(null);
  const [listedEmpleado, setListedEmpleado] = React.useState<Empleado[]>(empleados);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedEmpleado, setSelectedEmpleado] = React.useState<Empleado | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);


  //Handlers
  const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
  const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
  const onDelete = React.useCallback(() => {
    if (selectedEmpleado) {
      setShowDeleteModal(false);
      setLoading(true);
      DataLayer.delete.Empleado(selectedEmpleado.id!)
        .then(() => setListedEmpleado((prevState: Empleado[]) => prevState.filter((item: Empleado) => item.id !== selectedEmpleado.id)))
        .catch((error: any) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [selectedEmpleado, setShowDeleteModal, setListedEmpleado, setLoading]);
  const onSave = React.useCallback((p: Empleado) => {
    if (selectedEmpleado) {
      setShowSaveModal(false);
      setLoading(true);
      if (p.id) {
        DataLayer.update.Empleado(p)
          .then((editedEmpleado: Empleado) => setListedEmpleado((prevState: Empleado[]) => prevState.map((item: Empleado) => item.id === editedEmpleado.id ? editedEmpleado : item)))
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      } else {
        // Delete id property since it is a create action
        delete p.id;

        DataLayer.create.Empleado(p)
          .then((createdEmpleado: Empleado) => {
            setListedEmpleado((prevState: Empleado[]) => [...prevState, createdEmpleado]);
          })
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      }
    }
  }, [selectedEmpleado, setShowSaveModal, setListedEmpleado, setLoading]);
  const onShowDeleteModal = React.useCallback((p: Empleado) => {
    setSelectedEmpleado(p);
    setShowDeleteModal(true);
  }, [setSelectedEmpleado, setShowDeleteModal]);
  const onShowSaveModal = React.useCallback((p?: Empleado) => {
    setSelectedEmpleado(p ?? emptyEmpleado);
    setShowSaveModal(true);
  }, [setSelectedEmpleado, setShowSaveModal])

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
      </Alert>
    );
  }

  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      {
        loading
          ? (
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
              <Spinner animation="border" />
            </div>
          )
          : (
            <>
              <Button onClick={() => onShowSaveModal()} style={{ float: 'right', margin: 10 }} variant="primary">Create Product</Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listedEmpleado.map((e: Empleado) => (
                      <tr key={e.id}>
                        <td width='2%'>{e.id}</td>
                        <td width='23%'>{e.nombre}</td>
                        <td width='45%'>{e.apellido}</td>
                        <td width='10%'>{e.telefono}</td>
                        <td width='5%'>{e.email}</td>
                        <td width='5%'>{e.idUsuario}</td>
                        <td width='10%'>
                          <Button onClick={() => onShowSaveModal(e)} variant="link">Edit</Button>
                          <Button onClick={() => onShowDeleteModal(e)} variant="link">Delete</Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </>
          )
      }

 {/* TODAVIA A IMPLEMENTAR , PRIMERO VOY A DEJAR TODO FUNCIONANDO */}
      {/* {/* <DeleteProductModal
        onDelete={onDelete}
        onHide={onCloseDeleteModal}
        product={selectedProduct}
        show={showDeleteModal}
      />
      <SaveProductModal
        onHide={onCloseSaveModal}
        onSave={onSave}
        product={selectedProduct}
        show={showSaveModal}
      /> */}
  
      
  
  </React.Suspense>
  )}
;

export default TablaEmpleado;

  