import { Empleado } from "../tipos/Empleado";
import * as React from 'react';

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
  const [selectedEmpleado, setSelectedProduct] = React.useState<Product | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

  }