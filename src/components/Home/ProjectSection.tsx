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
        imageLink: "https://eresmama.com/wp-content/uploads/2019/09/alumnos-levantar-mano-clase.jpg"
    },
    {
        id: 3,
        titulo: "CraftCoding",
        descripcion: "Programa desarrollado para fomentar el desarrollo de codigo sin IA, fomentando la creatividad del usuario",
        tecnologias: ["Python"],
        linkRepo: "https://github.com/ikkxeer/CraftCoding",
        linkDemo: "#",
        imageLink: "https://aurora.edu/_files/img/ai/what-is-ai-800x500.jpg"
    },
    {
        id: 4,
        titulo: "NE-Launcher",
        descripcion: "Programa para facilitar el comienzo de proyectos con NodeJS y Express",
        tecnologias: ["Python"],
        linkRepo: "https://github.com/ikkxeer/NE-Launcher",
        linkDemo: "#",
        imageLink: "https://blog.prosite.dev/content/images/2024/12/NODEJS-API-REST-EXPRESS-1.jpg"
    },
    {
        id: 5,
        titulo: "MultiTool-Virtualbox",
        descripcion: "Programa para facilitar la creacion y asignacion de discos de forma masiva en maquinas virtuales",
        tecnologias: ["Python"],
        linkRepo: "https://github.com/ikkxeer/MultiTool-Virtualbox",
        linkDemo: "#",
        imageLink: "https://www.softzone.es/app/uploads-softzone.es/2020/02/Virtualbox-Logo.jpg"
    },
    {
        id: 6,
        titulo: "PS-SilentInstallerDetector",
        descripcion: "Herramienta para detectar la instalacion de programas en modo silencioso",
        tecnologias: ["Powershell"],
        linkRepo: "https://github.com/ikkxeer/PS-SilentInstallerDetector",
        linkDemo: "#",
        imageLink: "https://static.vecteezy.com/system/resources/previews/005/163/462/non_2x/man-updating-software-on-computer-with-progress-bar-and-installation-software-system-illustration-vector.jpg"
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