import './Asignaturas.css';
import AnimacionGeneralScroll from '../components/All/AnimacionGeneralScroll';

const asignaturas = [
    {
        nombre: '0488. Desenvolupament d\'Interfícies',
        descripcion: 'Disseny i creació d\'interfícies gràfiques, usabilitat, desenvolupament de components personalitzats, testing amb NUnit i generació d\'informes i ajudes.',
        icono: '💻'
    },
    {
        nombre: '0489. Programació multimèdia i dispositius mòbils',
        descripcion: 'Desenvolupament d\'aplicacions natives per a Android, gestió de recursos multimèdia, motors de jocs i ús de sensors.',
        icono: '📱'
    },
    {
        nombre: '0492. Projecte',
        descripcion: 'Planificació, disseny i execució d\'un projecte de programari real integrant diverses tecnologies, metodologies àgils i gestió del cicle de vida.',
        icono: '🚀'
    },
    {
        nombre: '0490. Programació de serveis i processos',
        descripcion: 'Programació multifil i multiprocés, comunicació mitjançant sòcols (sockets), serveis en xarxa i protocols de seguretat i criptografia.',
        icono: '⚙️'
    },
    {
        nombre: 'OPT. Desenvolupament Web Entorn Client',
        descripcion: 'Creació d\'aplicacions web, frameworks de frontend (com React o Angular), manipulació del DOM i consum d\'APIs.',
        icono: '🌐'
    },
];

export default function Asignaturas() {
    return (
        <div className="asignaturas-page" id="asignaturas">
            <div className="asignaturas-header">
                <AnimacionGeneralScroll>
                    <h1 className="title">Assignatures</h1>
                    <p className="subtitle">
                        Un recorregut per les matèries principals que han forjat el meu perfil com a desenvolupador,
                        abastant des de les bases teòriques fins a les tecnologies web més modernes al segon any de DAM.
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
