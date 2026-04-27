import './Timeline.css';

const timelineData = [
  {
    year: "2022",
    title: "Hola mundo ",
    description: "Mientras que cursaba el grado medio de SMX, me sentí muy estancado, todo eso cambió gracias a mi profesor Raul López, el cual me motivó a comenzar a programar en Python, proponiendome nuevos retos y preparandome para el grado superior con unas bases fundamentales, a su vez, donde hice las practicas de grado medio, Marc Vidal mi tutor de practicas en aquel entonces, me motivó también enseñandome a programar en Powershell y desarrollando scripts de automatización para la empresa de entonces los cuales nos ahorraron mucho tiempo de trabajo.",
    languages: ['Python', 'Powershell']
  },
  {
    year: "2024/25",
    title: "Estudios y Lógica",
    description: "Decidí tomármelo en serio y empecé a formarme con el grado superior de DAM. Me sumergí en la lógica de programación con Java y bases de datos. Sin duda una de las mejores etapas, el comienzo, donde cada nuevo reto es una nueva ilusion para mi.",
    languages: ['Java', 'Javascript', 'SQL', 'XML', 'XAML', 'JSON', 'HTML', 'CSS']
  },
  {
    year: "2026",
    title: "¿Backend? ¿Frontend? ¿Qué es eso?",
    description: "En el segundo año de DAM comencé a descubrir el mundo del desarrollo web, descubriendo un sinfín de tecnologías y frameworks, entre ellos React que como veis, me ha enganchado un poco.",
    languages: ['React', 'Angular', 'Node.js + Express.js', 'Express.js', 'SQL', 'HTML', 'CSS']
  },
  {
    year: "Actualidad",
    title: "¿Hacia dónde voy?",
    description: "Siendo completamente sincero, estoy confundido, estoy en un momento de duda, de no saber si dar el salto al mundo laboral y comenzar a tener experiencia o ampliar mis estudios yendo de camino a la Universidad, es una de las decisiones mas importantes de mi vida y tendré que tomar una decisión pronto.",
    languages: []
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
              <div className="languages-container">
                {item.languages.map((language, index) => (
                  <span className="timeline-language" key={index}>{language}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}