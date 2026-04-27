import './SoftSkills.css';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GroupsIcon from '@mui/icons-material/Groups';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export default function SoftSkills() {
    return (
        <section className="soft-skills-section">
            <h2 className="skills-main-title">Mi Filosofía de Trabajo</h2>

            <div className="skills-grid">

                {/* Resolución de problemas */}
                <div className="skill-card">
                    <div className="skill-icon-wrapper">
                        <LightbulbIcon sx={{ fontSize: 40, color: '#646cff' }} />
                    </div>
                    <h3 className="skill-title">Resolución de Problemas</h3>
                    <p className="skill-description">
                        No me rindo fácilmente ante un bug. Disfruto rebuscando sobre problemas complejos, descomponiendolos y buscando la solución más óptima y limpia posible.
                    </p>
                </div>

                {/* Trabajo en equipo */}
                <div className="skill-card">
                    <div className="skill-icon-wrapper">
                        <GroupsIcon sx={{ fontSize: 40, color: '#646cff' }} />
                    </div>
                    <h3 className="skill-title">Trabajo en Equipo</h3>
                    <p className="skill-description">
                        Pienso que el mejor código se escribe colaborando entre compañeros, ya que cada uno tiene una forma distinta de ver las cosas. Me gusta comunicar ideas claramente, aceptar feedback y ayudar cuando lo necesitan.
                    </p>
                </div>

                {/* Aprendizaje continuo */}
                <div className="skill-card">
                    <div className="skill-icon-wrapper">
                        <RocketLaunchIcon sx={{ fontSize: 40, color: '#646cff' }} />
                    </div>
                    <h3 className="skill-title">Aprendizaje Continuo</h3>
                    <p className="skill-description">
                        La tecnología cambia continuamente, y a mí me encanta estar siempre aprendiendo. Me adapto rápido a nuevas herramientas, lenguajes y entornos.
                    </p>
                </div>

            </div>
        </section>
    );
}