import './Asignaturas.css';
import AnimacionGeneralScroll from '../components/All/AnimacionGeneralScroll';
import { useLanguage } from '../context/LanguageContext';

const getAsignaturas = (t: any) => [
    {
        nombre: t('asignaturas', 'a1_title'),
        descripcion: t('asignaturas', 'a1_desc'),
        icono: '💻'
    },
    {
        nombre: t('asignaturas', 'a2_title'),
        descripcion: t('asignaturas', 'a2_desc'),
        icono: '📱'
    },
    {
        nombre: t('asignaturas', 'a3_title'),
        descripcion: t('asignaturas', 'a3_desc'),
        icono: '🚀'
    },
    {
        nombre: t('asignaturas', 'a4_title'),
        descripcion: t('asignaturas', 'a4_desc'),
        icono: '⚙️'
    },
    {
        nombre: t('asignaturas', 'a5_title'),
        descripcion: t('asignaturas', 'a5_desc'),
        icono: '🌐'
    },
];

export default function Asignaturas() {
    const { t } = useLanguage();
    const asignaturas = getAsignaturas(t);

    return (
        <div className="asignaturas-page" id="asignaturas">
            <div className="asignaturas-header">
                <AnimacionGeneralScroll>
                    <h1 className="title">{t('asignaturas', 'title')}</h1>
                    <p className="subtitle">
                        {t('asignaturas', 'subtitle')}
                    </p>
                </AnimacionGeneralScroll>
            </div>

            <div className="asignaturas-grid">
                {asignaturas.map((asig, index) => (
                    <AnimacionGeneralScroll key={index}>
                        <div className="asignatura-card">
                            <div className="asignatura-icon">{asig.icono}</div>
                            <h3 className="asignatura-title">{asig.nombre}</h3>
                            <p className="asignatura-desc">{asig.descripcion}</p>
                            <div className="asignatura-glow"></div>
                        </div>
                    </AnimacionGeneralScroll>
                ))}
            </div>
        </div>
    );
}
