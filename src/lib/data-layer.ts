import { Empleado } from "../tipos/Empleado";

//URL DE RENDER
const API_BASE_URL: string = '';

const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: Empleado): Promise<any> => {
  const options: any = { headers: { 'Content-Type': 'application/json' }, method };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  //Chequear URL de render
  const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
  const data = await response.json();

  return data;
};

const fnCreateEmpleado = async (Empleado: Empleado) => fetchApiCall('POST', undefined, Empleado);
const fnDeleteEmpleado = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchEmpleados = async () => fetchApiCall('GET');
const fnUpdateEmpleado = async (Empleado: Empleado) => fetchApiCall('PUT', Empleado.id, Empleado);

type DataLayer = {
  create: {
    Empleado: typeof fnCreateEmpleado,
  },
  delete: {
    Empleado: typeof fnDeleteEmpleado,
  },
  fetch: {
    Empleados: typeof fnFetchEmpleados,
  },
  update: {
    Empleado: typeof fnUpdateEmpleado,
  }
};

const DataLayer: DataLayer = {
  create: {
    Empleado: fnCreateEmpleado,
  },
  delete: {
    Empleado: fnDeleteEmpleado,
  },
  fetch: {
    Empleados: fnFetchEmpleados,
  },
  update: {
    Empleado: fnUpdateEmpleado,
  }
};

export default DataLayer;
