import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";
import ProductoCarrito from "./ProductoCarrito";
import "./carrito.scss";
import { useFormik, Field } from "formik";
import * as Yup from "yup";

const formikInitialValues = {
  metodoPago: '',
  retiraEnLocal: null,
  direccionEnvio: '',
  nombreApellido: '',
  numeroTelefono: ''
};

const Carrito = () => {
  const carritoContext = useContext(CarritoContext);

  const validationSchema = () => {
    return Yup.object().shape({
      metodoPago: Yup.string()
        .oneOf(["MERCADOPAGO", "EFECTIVO"] as const)
        .defined(),
      retiraEnLocal: Yup.boolean().required().oneOf([false, true]),
      direccionEnvio: Yup.string().when("retiraEnLocal", {
        is: false,
      }),
      nombreApellido: Yup.string().required("Ingrese el nombre y apellido"),
      numeroTelefono: Yup.string().required("Ingrese el numero de telefono")
    });
  };

  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <button className="boton-secundario">
        <FontAwesomeIcon icon={faArrowLeft} />
        Volver
      </button>
      <h2>Ya casi terminamos!</h2>

      {/*Hacer con formik despues */}
      <div>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="metodo-pago">Metodo de pago</label>
          <input
            type="radio"
            name="metodo-pago"
            id="metodo-pago"
            checked={formik.values.metodoPago === 'EFECTIVO'}
            onChange={formik.handleChange}
            value="EFECTIVO"
          />
        </form>
      </div>

      <div>
        <h1>Tu pedido</h1>
        <div>
          {carritoContext.productosCarrito.map((productoCarrito) => (
            <ProductoCarrito {...productoCarrito} />
          ))}
          <p>Tiempo de entrega estimado: MM minutos</p>
          <h3>Total: ${carritoContext.totalCarrito}</h3>
        </div>

        <button className="boton-primario">Confirmar pedido</button>
      </div>
    </div>
  );
};

export default Carrito;
