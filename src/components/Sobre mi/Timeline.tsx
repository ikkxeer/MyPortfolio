import './Timeline.css';

const timelineData = [
  {
    year: "2022",
    title: "Hola mundo ",
    description: "Mientras que cursaba el grado medio de SMX en la desesperación por encontrar una pasión, gracias a un profesor llamado Raúl, me motivó a comenzar a practicar con el lenguaje Python."
  },
  {
    year: "2024",
    title: "Estudios y Lógica",
    description: "Decidí tomármelo en serio y empecé a formarme con el grado superior de DAM. Me sumergí en la lógica de programación con Java y bases de datos. Sin duda una de las mejores etapas, el comienzo, donde cada nuevo reto es una nueva ilusion para mi."
  },
  {
    year: "2026",
    title: "¿Backend? ¿Frontend? ¿Qué es eso?",
    description: "En el segundo año de DAM comencé a descubrir el mundo del desarrollo web, descubriendo un sinfín de tecnologías y frameworks, entre ellos React que como veis, me ha enganchado un poco."
  },
  {
    year: "Actualidad",
    title: "¿Hacia dónde voy?",
    description: "Siendo completamente sincero, estoy confundido, estoy en un momento de duda, de no saber si dar el salto al mundo laboral y comenzar a tener experiencia o ampliar mis estudios yendo de camino a la Universidad, es una de las decisiones mas importantes de mi vida y tendré que tomar una decisión pronto."
  }
];

export default function Timeline() {
  return (
    <div className="timeline-container" id="trayectoria">
      <h2 className="timeline-main-title">Mi Trayectoria</h2>

      <div className="timeline-wrapper">
        {timelineData.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>

            {/* Tarjeta de contenido */}
            <div className="timeline-content">
              <span className="timeline-year">{item.year}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}