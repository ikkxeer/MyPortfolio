import './Timeline.css';

const timelineData = [
  {
    year: "2022",
    title: "Mi primer 'Hola Mundo'",
    description: "Mientras que cursaba el grado medio de SMX en la desesperación por encontrar una pasión, gracias a un profesor llamado Raúl, me motivó a comenzar a practicar con el lenguaje Python."
  },
  {
    year: "2024",
    title: "Estudios y Lógica",
    description: "Decidí tomármelo en serio y empecé a formarme con el grado superior de DAM. Me sumergí en la lógica de programación con Java y bases de datos. Sin duda una de las mejores etapas, el comienzo, donde cada nuevo reto es una nueva ilusion para mi."
  },
  {
    year: "2026",
    title: "Desarrollo Full-Stack",
    description: "Dando el salto a tecnologías modernas como React y Node.js. Desarrollando proyectos completos, desde la interfaz de usuario hasta la gestión de bases de datos, listo para el mundo profesional."
  }
];

export default function Timeline() {
  return (
    <div className="timeline-container">
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