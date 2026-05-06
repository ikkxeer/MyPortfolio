import './Timeline.css';

const timelineData = [
  {
    year: "2022",
    title: "Hola món ",
    description: "Mentre cursava el grau mitjà de SMX, em vaig sentir molt estancat. Tot això va canviar gràcies al meu professor Raul López, el qual em va motivar a començar a programar en Python, proposant-me nous reptes i preparant-me per al grau superior amb unes bases fonamentals. Al seu torn, on vaig fer les pràctiques de grau mitjà, Marc Vidal, el meu tutor de pràctiques en aquell moment, em va motivar també ensenyant-me a programar en Powershell i desenvolupant scripts d'automatització per a l'empresa de llavors els quals ens van estalviar molt de temps de treball.",
    languages: ['Python', 'Powershell']
  },
  {
    year: "2024/25",
    title: "Estudis i Lògica",
    description: "Vaig decidir prendre-m'ho seriosament i vaig començar a formar-me amb el grau superior de DAM. Em vaig submergir en la lògica de programació amb Java i bases de dades. Sens dubte una de les millors etapes, el començament, on cada nou repte és una nova il·lusió per a mi.",
    languages: ['Java', 'Javascript', 'SQL', 'XML', 'XAML', 'JSON', 'HTML', 'CSS']
  },
  {
    year: "2026",
    title: "¿Backend? ¿Frontend? Què és això?",
    description: "En el segon any de DAM vaig començar a descobrir el món del desenvolupament web, descobrint una infinitat de tecnologies i frameworks, entre ells React que com veieu, m'ha enganxat una mica.",
    languages: ['React', 'Angular', 'Node.js + Express.js', 'Express.js', 'SQL', 'HTML', 'CSS']
  },
  {
    year: "Actualitat",
    title: "Cap a on vaig?",
    description: "Sent completament sincer, estic confós, estic en un moment de dubte, de no saber si fer el salt al món laboral i començar a tenir experiència o ampliar els meus estudis anant de camí a la Universitat. És una de les decisions més importants de la meva vida i hauré de prendre una decisió aviat.",
    languages: []
  }
];

export default function Timeline() {
  return (
    <div className="timeline-container" id="trayectoria">
      <h2 className="timeline-main-title">La meva Trajectòria</h2>

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