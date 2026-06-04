import { useState } from "react";

import { useLanguage } from "../../context/LanguageContext";

import ProjectModal from "../All/ProjectModal";

import "./ProjectSection.css";

// Objeto de un proyecto
export type Proyecto = {
  id: number;
  titulo: string;
  descripcion: string;
  descripcionAmpliada: string;
  tecnologias: string[];
  linkRepo: string;
  linkDemo: string;
  imageLink: string;
};

// Función para obtener los proyectos
const getProyectos = (
  t: (section: string, key: string) => string,
): Proyecto[] => [
  {
    id: 1,
    titulo: "PSCacheCleaner",
    descripcion: t("projects", "p1_desc"),
    descripcionAmpliada: t("projects", "p1_desc_long"),
    tecnologias: ["Powershell"],
    linkRepo: "https://github.com/ikkxeer/PSCacheCleaner",
    linkDemo: "",
    imageLink:
      "https://www.ionos.es/digitalguide/fileadmin/DigitalGuide/Teaser/cache-leeren-t.jpg",
  },

  {
    id: 2,
    titulo: t("projects", "p2_title"),
    descripcion: t("projects", "p2_desc"),
    descripcionAmpliada: t("projects", "p2_desc_long"),
    tecnologias: ["Java", "SQL"],
    linkRepo: "https://github.com/ikkxeer/Gestor-Alumnos",
    linkDemo: "#",
    imageLink:
      "https://eresmama.com/wp-content/uploads/2019/09/alumnos-levantar-mano-clase.jpg",
  },

  {
    id: 3,
    titulo: "CraftCoding",
    descripcion: t("projects", "p3_desc"),
    descripcionAmpliada: t("projects", "p3_desc_long"),
    tecnologias: ["Python"],
    linkRepo: "https://github.com/ikkxeer/CraftCoding",
    linkDemo: "#",
    imageLink:
      "https://www.htx.gov.sg/images/default-source/news/2024/ai-article-1-banner-shot-min.jpg?sfvrsn=4b7c6915_3",
  },

  {
    id: 4,
    titulo: "NE-Launcher",
    descripcion: t("projects", "p4_desc"),
    descripcionAmpliada: t("projects", "p4_desc_long"),
    tecnologias: ["Python"],
    linkRepo: "https://github.com/ikkxeer/NE-Launcher",
    linkDemo: "#",
    imageLink:
      "https://blog.prosite.dev/content/images/2024/12/NODEJS-API-REST-EXPRESS-1.jpg",
  },

  {
    id: 5,
    titulo: "MultiTool-Virtualbox",
    descripcion: t("projects", "p5_desc"),
    descripcionAmpliada: t("projects", "p5_desc_long"),
    tecnologias: ["Python"],
    linkRepo: "https://github.com/ikkxeer/MultiTool-Virtualbox",
    linkDemo: "#",
    imageLink:
      "https://www.softzone.es/app/uploads-softzone.es/2020/02/Virtualbox-Logo.jpg",
  },

  {
    id: 6,
    titulo: "PS-SilentInstallerDetector",
    descripcion: t("projects", "p6_desc"),
    descripcionAmpliada: t("projects", "p6_desc_long"),
    tecnologias: ["Powershell"],
    linkRepo: "https://github.com/ikkxeer/PS-SilentInstallerDetector",
    linkDemo: "#",
    imageLink:
      "https://static.vecteezy.com/system/resources/previews/005/163/462/non_2x/man-updating-software-on-computer-with-progress-bar-and-installation-software-system-illustration-vector.jpg",
  },
];

export default function ProjectSection() {
  // Hook para obtener el idioma
  const { t } = useLanguage();

  // Obtener los proyectos
  const misProyectos = getProyectos(t);

  // Estado para el proyecto seleccionado
  const [proyectoSeleccionado, setProyectoSeleccionado] =
    useState<Proyecto | null>(null);

  // Función para abrir el modal
  const abrirModal = (proyecto: Proyecto) => setProyectoSeleccionado(proyecto);

  // Función para cerrar el modal
  const cerrarModal = () => setProyectoSeleccionado(null);

  return (
    <section id="proyectos" className="projects-section">
      <h2 className="section-title">{t("projects", "title")}</h2>

      <div className="projects-grid">
        {misProyectos.map((p) => (
          <div
            className="project-card"
            key={p.id}
            onClick={() => abrirModal(p)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();

                abrirModal(p);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`${p.titulo} — ver detalles`}
          >
            <div className="project-image-placeholder">
              <img src={p.imageLink} alt={p.titulo} className="project-image" />
            </div>

            <div className="project-info">
              <h3>{p.titulo}</h3>

              <p>{p.descripcion}</p>

              <div className="tech-tags">
                {p.tecnologias.map((tech, index) => (
                  <span className="tag" key={index}>
                    {tech}
                  </span>
                ))}
              </div>

              <div
                className="project-links"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={p.linkRepo}
                  className="link-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>

                {p.linkDemo && p.linkDemo !== "#" && (
                  <a
                    href={p.linkDemo}
                    className="link-btn primary-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("projects", "demo")}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        isOpen={proyectoSeleccionado !== null}
        onClose={cerrarModal}
        title={proyectoSeleccionado?.titulo}
      >
        {proyectoSeleccionado && (
          <>
            <img
              src={proyectoSeleccionado.imageLink}
              alt={proyectoSeleccionado.titulo}
              className="project-modal-image"
            />

            <p className="project-modal-description">
              {proyectoSeleccionado.descripcionAmpliada}
            </p>

            <div className="project-modal-tags">
              {proyectoSeleccionado.tecnologias.map((tech) => (
                <span className="tag" key={tech}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-modal-links">
              <a
                href={proyectoSeleccionado.linkRepo}
                className="link-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>

              {proyectoSeleccionado.linkDemo &&
                proyectoSeleccionado.linkDemo !== "#" && (
                  <a
                    href={proyectoSeleccionado.linkDemo}
                    className="link-btn primary-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("projects", "demo")}
                  </a>
                )}
            </div>
          </>
        )}
      </ProjectModal>
    </section>
  );
}
