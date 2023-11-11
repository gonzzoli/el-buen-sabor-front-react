import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
enum TipoRubro{
    bebida= 'BEBIDA',
    cocina='COCINA',
}
enum EstadoRubro{
    activo='ACTIVO',
    inactivo='INACTIVO',
}

interface RubroProps{
    id: number;
    nombreRubro: String;
    tipoRubro: TipoRubro;
    estado: EstadoRubro;
}

const Rubro: React.FC<RubroProps> = ({
    nombreRubro,
    tipoRubro,
    estado,
}) => {
    return(
        <>
        <Header/>
        <Footer/>

        </>
    )
}


export default Rubro;