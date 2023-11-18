import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import ProductoCarrito from "./ProductoCarrito";
import "./carrito.scss";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../context/SessionContext";

enum MetodoPago {
  MERCADO_PAGO = "MERCADO_PAGO",
  EFECTIVO = "EFECTIVO",
}

enum MetodoEnvio {
  DELIVERY = "DELIVERY",
  RETIRA = "RETIRA",
}

type ProductoPedido = {
  cantidad: number;
  idProducto: number;
};

type Pedido = {
  tipoPago: MetodoPago;
  tipoEnvio: MetodoEnvio;
  //direccionEnvio: string;
  //nombreApellido: string;
  //numeroTelefono: string;
  detallesPedido: ProductoPedido[];
};

const formikInitialValues = {
  metodoPago: "",
  retiraEnLocal: null,
  direccionEnvio: "",
  nombreApellido: "",
  numeroTelefono: "",
};

const Carrito = () => {
  const carritoContext = useContext(CarritoContext);
  const sessionContext = useContext(SessionContext)
  const [metodoPago, setMetodoPago] = useState<MetodoPago>(MetodoPago.EFECTIVO);
  const [metodoEnvio, setMetodoEnvio] = useState<MetodoEnvio>(
    MetodoEnvio.DELIVERY
  );
  // const [direccionEnvio, setDireccionEnvio] = useState("");
  // const [numeroTelefono, setNumeroTelefono] = useState("");
  // const [nombreApellido, setNombreApellido] = useState("");
  const navigate = useNavigate();

  const confirmarPedido = async () => {
    const detallesPedido: ProductoPedido[] =
      carritoContext.productosCarrito.map((productoCarrito) => {
        return {
          cantidad: productoCarrito.cantidad,
          idProducto: productoCarrito.producto.idProducto,
        };
      });
    const pedido: Pedido = {
      detallesPedido,
      tipoPago: metodoPago,
      tipoEnvio: metodoEnvio,
      // numeroTelefono,
      // nombreApellido,
      // direccionEnvio,
    };
    console.log(JSON.stringify(pedido))
    try {
      const response = await fetch(import.meta.env.VITE_URL_API + "/pedidos/crearPedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionContext.jwtToken}`
        },
        body: JSON.stringify(pedido),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
    setMetodoPago(e.target.value as MetodoPago);
  };

  const onChangeMetodoEnvio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetodoEnvio(e.target.value as MetodoEnvio);
  };

  return (
    <section className="principal">
      <div className="arriba">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="boton-secundario boton-volver"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Volver
        </button>
        <h1 className="titulo-1 titulo-carrito">Ya casi terminamos!</h1>
        <span></span>
      </div>
      {/*Hacer con formik despues */}
      <div className="contenido">
        <div className="informacion-pago">
          <div className="modo-entrega seleccion-radio">
            <h4 className="titulo-4">Metodo de entrega</h4>
            <div className="opciones">
              {" "}
              <input
                type="radio"
                name="metodo-entrega"
                id="metodo-entrega"
                checked={metodoEnvio == MetodoEnvio.RETIRA}
                onChange={onChangeMetodoEnvio}
                value={MetodoEnvio.RETIRA}
              />
              <label htmlFor="metodo-entrega">Retira en local</label>
              <input
                type="radio"
                name="metodo-entrega"
                id="metodo-entrega"
                checked={metodoEnvio == MetodoEnvio.DELIVERY}
                onChange={onChangeMetodoEnvio}
                value={MetodoEnvio.DELIVERY}
              />
              <label htmlFor="metodo-entrega">Delivery</label>
            </div>
          </div>

          {metodoEnvio == MetodoEnvio.RETIRA && (
            <div className="metodo-pago seleccion-radio">
              <h4 className="titulo-4">Método de pago</h4>
              <div className="opciones">
                <input
                  type="radio"
                  name="metodo-pago"
                  id="metodo-pago"
                  checked={metodoPago == MetodoPago.EFECTIVO}
                  onChange={onChangeMetodoPago}
                  value={MetodoPago.EFECTIVO}
                />
                <label htmlFor="metodo-pago">Efectivo</label>

                <input
                  type="radio"
                  name="metodo-pago"
                  id="metodo-pago"
                  checked={metodoPago == MetodoPago.MERCADO_PAGO}
                  onChange={onChangeMetodoPago}
                  value={MetodoPago.MERCADO_PAGO}
                />
                <label htmlFor="metodo-pago">Mercado Pago</label>
              </div>
            </div>
          )}
          <div className="datos-cliente">
            <h3 className="titulo-3">Tus datos</h3>
            <div className="contenedor-inputs">
              <div className="form-texto">
                <label htmlFor="nombre-apellido">Nombre y Apellido</label>
                <input
                  type="text"
                  name="nombre-apellido"
                  id="nombre-apellido"
                  className="texto-input"
                />
              </div>
              <div className="form-texto">
                <label htmlFor="direccion">Direccion</label>
                <input
                  type="text"
                  name="direccion"
                  id="direccion"
                  className="texto-input"
                />
              </div>
              <div className="form-texto">
                <label htmlFor="numero-telefono">Numero de telefono</label>
                <input
                  type="number"
                  name="numero-telefono"
                  id="numero-telefono"
                  className="texto-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pedido">
          <div className="ventana-emergente ventana-carrito">
            <h2 className="titulo-2 titulo-carrito">Tu pedido</h2>
            <div className="carrito-lista-productos">
              {carritoContext.productosCarrito.map((productoCarrito, index) => (
                <ProductoCarrito key={index} {...productoCarrito} />
              ))}
            </div>
            <p>Tiempo de entrega estimado: MM minutos</p>
            <p className="titulo-4 precio-total">
              Total: ${carritoContext.totalCarrito}
            </p>
          </div>
        </div>
      </div>
      <div className="boton-confirmar-contenedor">
        <button
          onClick={confirmarPedido}
          className="boton-primario boton-confirmar"
        >
          Confirmar pedido
        </button>
      </div>
    </section>
  );
};

export default Carrito;
