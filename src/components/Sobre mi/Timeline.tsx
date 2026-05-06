import { useLanguage } from '../../context/LanguageContext';
import './Timeline.css';

const getTimelineData = (t: any) => [
  {
    year: "2022",
    title: t('timeline', 't1_title'),
    description: t('timeline', 't1_desc'),
    languages: ['Python', 'Powershell']
  },
  {
    year: "2024/25",
    title: t('timeline', 't2_title'),
    description: t('timeline', 't2_desc'),
    languages: ['Java', 'Javascript', 'SQL', 'XML', 'XAML', 'JSON', 'HTML', 'CSS']
  },
  {
    year: "2026",
    title: t('timeline', 't3_title'),
    description: t('timeline', 't3_desc'),
    languages: ['React', 'Angular', 'Node.js + Express.js', 'Express.js', 'SQL', 'HTML', 'CSS']
  },
  {
    year: t('timeline', 't4_year'),
    title: t('timeline', 't4_title'),
    description: t('timeline', 't4_desc'),
    languages: []
  }
];

export default function Timeline() {
  const { t } = useLanguage();
  const timelineData = getTimelineData(t);

  return (
    <div className="timeline-container" id="trayectoria">
      <h2 className="timeline-main-title">{t('timeline', 'title')}</h2>

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