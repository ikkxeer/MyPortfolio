import './SoftSkills.css';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GroupsIcon from '@mui/icons-material/Groups';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export default function SoftSkills() {
    return (
        <section className="soft-skills-section">
            <h2 className="skills-main-title">La Meva Filosofia de Treball</h2>

            <div className="skills-grid">

                {/* Resolución de problemas */}
                <div className="skill-card">
                    <div className="skill-icon-wrapper">
                        <LightbulbIcon sx={{ fontSize: 40, color: '#646cff' }} />
                    </div>
                    <h3 className="skill-title">Resolució de Problemes</h3>
                    <p className="skill-description">
                        No em rendeixo fàcilment davant d'un bug. Gaudeixo rebuscant sobre problemes complexos, descomponent-los i buscant la solució més òptima i neta possible.
                    </p>
                </div>

                {/* Trabajo en equipo */}
                <div className="skill-card">
                    <div className="skill-icon-wrapper">
                        <GroupsIcon sx={{ fontSize: 40, color: '#646cff' }} />
                    </div>
                    <h3 className="skill-title">Treball en Equip</h3>
                    <p className="skill-description">
                        Penso que el millor codi s'escriu col·laborant entre companys, ja que cadascú té una manera diferent de veure les coses. M'agrada comunicar idees clarament, acceptar feedback i ajudar quan ho necessiten.
                    </p>
                </div>

                {/* Aprendizaje continuo */}
                <div className="skill-card">
                    <div className="skill-icon-wrapper">
                        <RocketLaunchIcon sx={{ fontSize: 40, color: '#646cff' }} />
                    </div>
                    <h3 className="skill-title">Aprenentatge Continu</h3>
                    <p className="skill-description">
                        La tecnologia canvia contínuament i a mi m'encanta estar sempre aprenent. M'adapto ràpidament a noves eines, llenguatges i entorns.
                    </p>
                </div>

            </div>
        </section>
    );
}