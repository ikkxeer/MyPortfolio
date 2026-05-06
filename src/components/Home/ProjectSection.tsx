import './ProjectSection.css';

const misProyectos = [
    {
        id: 1,
        titulo: "PSCacheCleaner",
        descripcion: "Eina de neteja de memòria cau (caché) desenvolupada amb Powershell per a Windows",
        tecnologias: ["Powershell"],
        linkRepo: "https://github.com/ikkxeer/PSCacheCleaner",
        linkDemo: "",
        imageLink: "https://www.ionos.es/digitalguide/fileadmin/DigitalGuide/Teaser/cache-leeren-t.jpg"
    },
    {
        id: 2,
        titulo: "Gestor d'alumnes",
        descripcion: "Projecte desenvolupat en Java per a la gestió d'alumnes en una Base de dades SQL",
        tecnologias: ["Java", "SQL"],
        linkRepo: "https://github.com/ikkxeer/Gestor-Alumnos",
        linkDemo: "#",
        imageLink: "https://eresmama.com/wp-content/uploads/2019/09/alumnos-levantar-mano-clase.jpg"
    },
    {
        id: 3,
        titulo: "CraftCoding",
        descripcion: "Programa desenvolupat per fomentar el desenvolupament de codi sense IA, fomentant la creativitat de l'usuari",
        tecnologias: ["Python"],
        linkRepo: "https://github.com/ikkxeer/CraftCoding",
        linkDemo: "#",
        imageLink: "https://aurora.edu/_files/img/ai/what-is-ai-800x500.jpg"
    },
    {
        id: 4,
        titulo: "NE-Launcher",
        descripcion: "Programa per facilitar l'inici de projectes amb NodeJS i Express",
        tecnologias: ["Python"],
        linkRepo: "https://github.com/ikkxeer/NE-Launcher",
        linkDemo: "#",
        imageLink: "https://blog.prosite.dev/content/images/2024/12/NODEJS-API-REST-EXPRESS-1.jpg"
    },
    {
        id: 5,
        titulo: "MultiTool-Virtualbox",
        descripcion: "Programa per facilitar la creació i assignació de discos de forma massiva en màquines virtuals",
        tecnologias: ["Python"],
        linkRepo: "https://github.com/ikkxeer/MultiTool-Virtualbox",
        linkDemo: "#",
        imageLink: "https://www.softzone.es/app/uploads-softzone.es/2020/02/Virtualbox-Logo.jpg"
    },
    {
        id: 6,
        titulo: "PS-SilentInstallerDetector",
        descripcion: "Eina per detectar la instal·lació de programes en mode silenciós",
        tecnologias: ["Powershell"],
        linkRepo: "https://github.com/ikkxeer/PS-SilentInstallerDetector",
        linkDemo: "#",
        imageLink: "https://static.vecteezy.com/system/resources/previews/005/163/462/non_2x/man-updating-software-on-computer-with-progress-bar-and-installation-software-system-illustration-vector.jpg"
    }
];

export default function ProjectSection() {
    return (
        <section id="proyectos" className="projects-section">
            <h2 className="section-title">Projectes Personals</h2>
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
                                <a href={p.linkDemo} className="link-btn primary-link">Veure demo</a>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}