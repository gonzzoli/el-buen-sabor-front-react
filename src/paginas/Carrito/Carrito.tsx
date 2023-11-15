import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import ProductoCarrito from "./ProductoCarrito";
import "./carrito.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

const formikInitialValues = {
  metodoPago: "",
  retiraEnLocal: null,
  direccionEnvio: "",
  nombreApellido: "",
  numeroTelefono: "",
};

const Carrito = () => {
  const carritoContext = useContext(CarritoContext);
  const [metodoPago, setMetodoPago] = useState("");
  const [metodoEntrega, setMetodoEntrega] = useState("");
  const [direccionEnvio, setDireccionEnvio] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");

  const confirmarPedido = async () => {
    const pedido = {};
    const response = await fetch(import.meta.env.VITE_URL_API + "/pedidos", {
      method: "POST",
      body: JSON.stringify(pedido),
    });

    console.log(response);
  };

  // const validationSchema = () => {
  //   return Yup.object().shape({
  //     metodoPago: Yup.string()
  //       .oneOf(["MERCADOPAGO", "EFECTIVO"] as const)
  //       .defined(),
  //     retiraEnLocal: Yup.boolean().required().oneOf([false, true]),
  //     direccionEnvio: Yup.string().required("Ingrese la direccion de envio"),
  //     nombreApellido: Yup.string().required("Ingrese el nombre y apellido"),
  //     numeroTelefono: Yup.string().required("Ingrese el numero de telefono")
  //   });
  // };

  // const formik = useFormik({
  //   initialValues: formikInitialValues,
  //   validationSchema: validationSchema(),
  //   onSubmit: (values) => {
  //     console.log(values);

  //   },
  // });

  const onChangeMetodoPago = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetodoPago(e.target.value);
  };

  const onChangeMetodoEntrega = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetodoEntrega(e.target.value);
  };

  return (
    <div>
      <button className="boton-secundario">
        <FontAwesomeIcon icon={faArrowLeft} />
        Volver
      </button>
      <h2>Ya casi terminamos!</h2>

      {/*Hacer con formik despues */}
      <div>
        <h3>Metodo de entrega</h3>
        <div style={{ display: "flex", gap: "5px" }}>
          <input
            type="radio"
            name="metodo-entrega"
            id="metodo-entrega"
            checked={metodoEntrega == "RETIRA_EN_LOCAL"}
            onChange={onChangeMetodoEntrega}
            value="RETIRA_EN_LOCAL"
          />
          <label htmlFor="metodo-entrega">Retira en local</label>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <input
            type="radio"
            name="metodo-entrega"
            id="metodo-entrega"
            checked={metodoEntrega == "DELIVERY"}
            onChange={onChangeMetodoEntrega}
            value="DELIVERY"
          />
          <label htmlFor="metodo-entrega">Delivery</label>
        </div>

        {metodoEntrega == "RETIRA_EN_LOCAL" && (
          <>
            <h3>Metodo de pago</h3>
            <div style={{ display: "flex", gap: "5px" }}>
              <input
                type="radio"
                name="metodo-pago"
                id="metodo-pago"
                checked={metodoPago == "EFECTIVO"}
                onChange={onChangeMetodoPago}
                value="EFECTIVO"
              />
              <label htmlFor="metodo-pago">Efectivo</label>
            </div>

            <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
              <input
                type="radio"
                name="metodo-pago"
                id="metodo-pago"
                checked={metodoPago == "MERCADO_PAGO"}
                onChange={onChangeMetodoPago}
                value="MERCADO_PAGO"
              />
              <label htmlFor="metodo-pago">Mercado Pago</label>
            </div>
          </>
        )}
      </div>
      <div>
        <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
        <label htmlFor="metodo-pago">Nombre y Apellido</label>
          <input
            type="text"
            name="nombre-apellido"
            id="nombre-apellido"
          />

        </div>
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

        <button onClick={confirmarPedido} className="boton-primario">
          Confirmar pedido
        </button>
      </div>
    </div>
  );
};

export default Carrito;
