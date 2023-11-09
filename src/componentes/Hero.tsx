import "../estilos_generales.scss"

interface HeroProps {
    texto: string
    rutaImagen: string
}

const Hero: React.FC<HeroProps> = ({texto, rutaImagen}) => {
    return (
        <div className="hero">
            <img className="foto-hero" src={rutaImagen} alt="hero foto" />
            <h1 className="titulo1 texto-hero">
                {texto}
            </h1>
        </div>
    )
}

export default Hero