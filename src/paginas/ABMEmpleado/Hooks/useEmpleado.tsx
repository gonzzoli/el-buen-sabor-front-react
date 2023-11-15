import * as React from 'react';

import DataLayer from '../../../lib/data-layer';
import { Empleado } from '../../../tipos/Empleado';

type UseEmpleadoState = {
  data: Empleado[];
  error: any;
  loading: boolean;
};

const initialState: UseEmpleadoState = {
  data: [],
  error: null,
  loading: true,
};

const useEmpleado = () => {
  // State
  const [state, setState] = React.useState<UseEmpleadoState>(initialState);

  // Effects
  React.useEffect(function fetchEmpleado() {
    DataLayer.fetch.Empleados()
      .then((data: Empleado[]) => setState({ data, error: null, loading: false }))
      .catch((error: any) => setState({ data: [], error, loading: false }));
  }, [setState]);

  return state;
};

export default useEmpleado;
