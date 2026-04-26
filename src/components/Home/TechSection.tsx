import './TechSection.css';

const tecnologias = [
    {
        nombre: "React",
        logo: "https://devicons.io/devicons/icons/react.svg"
    },
    {
        nombre: "TypeScript",
        logo: "https://devicons.io/devicons/icons/typescript-icon.svg"
    },
    {
        nombre: "SQL",
        logo: "https://devicons.io/devicons/icons/mysql.svg"
    },
    {
        nombre: "Python",
        logo: "https://devicons.io/devicons/icons/python.svg"
    },
    {
        nombre: "Java",
        logo: "https://cdn-icons-png.flaticon.com/512/226/226777.png"
    },
    {
        nombre: "Powershell",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/PowerShell_5.0_icon.png"
    },
    {
        nombre: "HTML",
        logo: "https://cdn.iconscout.com/icon/free/png-256/free-html-5-icon-svg-download-png-1175208.png"
    },
    {
        nombre: "CSS",
        logo: "https://cdn-icons-png.flaticon.com/512/732/732190.png"
    }
]

export default function TechSection() {
    return (
        <section className="tech-section" id="tecnologias">
            <h2 className="section-title">Mis Tecnologias Favoritas</h2>

            <div className="slider-container">
                <div className="slider-track">
                    {/* Se duplica el array para que de la sensacion de bucle infinito */}
                    {[...tecnologias, ...tecnologias].map((tech, index) => (
                        <div key={index} className="tech-card">
                            <img className="devicon" src={tech.logo} alt={tech.nombre} width={50} height={50} style={{ marginRight: "10px" }} />
                            <span className="tech-name">{tech.nombre}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}