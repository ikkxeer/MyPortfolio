import { useLanguage } from '../../context/LanguageContext';
import './ProjectSection.css';

const getProyectos = (t: any) => [
    {
        id: 1,
        titulo: "PSCacheCleaner",
        descripcion: t('projects', 'p1_desc'),
        tecnologias: ["Powershell"],
        linkRepo: "https://github.com/ikkxeer/PSCacheCleaner",
        linkDemo: "",
        imageLink: "https://www.ionos.es/digitalguide/fileadmin/DigitalGuide/Teaser/cache-leeren-t.jpg"
    },
    {
        id: 2,
        titulo: t('projects', 'p2_title'),
        descripcion: t('projects', 'p2_desc'),
        tecnologias: ["Java", "SQL"],
        linkRepo: "https://github.com/ikkxeer/Gestor-Alumnos",
        linkDemo: "#",
        imageLink: "https://eresmama.com/wp-content/uploads/2019/09/alumnos-levantar-mano-clase.jpg"
    },
    {
        id: 3,
        titulo: "CraftCoding",
        descripcion: t('projects', 'p3_desc'),
        tecnologias: ["Python"],
        linkRepo: "https://github.com/ikkxeer/CraftCoding",
        linkDemo: "#",
        imageLink: "https://www.htx.gov.sg/images/default-source/news/2024/ai-article-1-banner-shot-min.jpg?sfvrsn=4b7c6915_3"
    },
    {
        id: 4,
        titulo: "NE-Launcher",
        descripcion: t('projects', 'p4_desc'),
        tecnologias: ["Python"],
        linkRepo: "https://github.com/ikkxeer/NE-Launcher",
        linkDemo: "#",
        imageLink: "https://blog.prosite.dev/content/images/2024/12/NODEJS-API-REST-EXPRESS-1.jpg"
    },
    {
        id: 5,
        titulo: "MultiTool-Virtualbox",
        descripcion: t('projects', 'p5_desc'),
        tecnologias: ["Python"],
        linkRepo: "https://github.com/ikkxeer/MultiTool-Virtualbox",
        linkDemo: "#",
        imageLink: "https://www.softzone.es/app/uploads-softzone.es/2020/02/Virtualbox-Logo.jpg"
    },
    {
        id: 6,
        titulo: "PS-SilentInstallerDetector",
        descripcion: t('projects', 'p6_desc'),
        tecnologias: ["Powershell"],
        linkRepo: "https://github.com/ikkxeer/PS-SilentInstallerDetector",
        linkDemo: "#",
        imageLink: "https://static.vecteezy.com/system/resources/previews/005/163/462/non_2x/man-updating-software-on-computer-with-progress-bar-and-installation-software-system-illustration-vector.jpg"
    }
];

export default function ProjectSection() {
    const { t } = useLanguage();
    const misProyectos = getProyectos(t);

    return (
        <section id="proyectos" className="projects-section">
            <h2 className="section-title">{t('projects', 'title')}</h2>
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
                                <a href={p.linkDemo} className="link-btn primary-link">{t('projects', 'demo')}</a>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}