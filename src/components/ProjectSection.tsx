import './ProjectSection.css';

const misProyectos = [
    {
        id: 1,
        titulo: "PSCacheCleaner",
        descripcion: "Herramienta de limpieza de caché desarrollada con Powershell para Windows",
        tecnologias: ["Powershell"],
        linkRepo: "https://github.com/ikkxeer/PSCacheCleaner",
        linkDemo: "",
        imageLink: "https://www.ionos.es/digitalguide/fileadmin/DigitalGuide/Teaser/cache-leeren-t.jpg"
    },
    {
        id: 2,
        titulo: "Gestor de alumnos",
        descripcion: "Proyecto desarrollado en Java para la gestión de alumnos en una Base de datos en SQL",
        tecnologias: ["Java", "SQL"],
        linkRepo: "https://github.com/ikkxeer/Gestor-Alumnos",
        linkDemo: "#",
        imageLink: "https://edusign.com/es/wp-content/uploads/sites/3/2023/12/software-de-gestion-de-alumnos.png"
    }
];

export default function ProjectSection() {
    return (
        <section id="proyectos" className="projects-section">
            <h2 className="section-title">Proyectos Personales</h2>
            <div className="projects-grid">

                {/* Mapeado por cada elemento dentro de la lista */}
                {misProyectos.map((p) => (
                    <div className="project-card" key={p.id}>

                        <div className="project-image-placeholder">
                            <img src={p.imageLink} alt={p.titulo} className="project-image" />
                        </div>

                        <div className="project-info">
                            <h3>{p.titulo}</h3>
                            <p>{p.descripcion}</p>

                            <div className="tech-tags">
                                {p.tecnologias.map((tech, index) => (
                                    <span className="tag" key={index}>{tech}</span>
                                ))}
                            </div>

                            <div className="project-links">
                                <a href={p.linkRepo} className="link-btn">Github</a>
                                <a href={p.linkDemo} className="link-btn primary-link">Ver demo</a>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}