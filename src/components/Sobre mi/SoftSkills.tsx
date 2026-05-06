import './SoftSkills.css';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GroupsIcon from '@mui/icons-material/Groups';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useLanguage } from '../../context/LanguageContext';

export default function SoftSkills() {
    const { t } = useLanguage();

    return (
        <section className="soft-skills-section">
            <h2 className="skills-main-title">{t('softSkills', 'title')}</h2>

            <div className="skills-grid">

                {/* Resolución de problemas */}
                <div className="skill-card">
                    <div className="skill-icon-wrapper">
                        <LightbulbIcon sx={{ fontSize: 40, color: '#646cff' }} />
                    </div>
                    <h3 className="skill-title">{t('softSkills', 's1_title')}</h3>
                    <p className="skill-description">
                        {t('softSkills', 's1_desc')}
                    </p>
                </div>

                {/* Trabajo en equipo */}
                <div className="skill-card">
                    <div className="skill-icon-wrapper">
                        <GroupsIcon sx={{ fontSize: 40, color: '#646cff' }} />
                    </div>
                    <h3 className="skill-title">{t('softSkills', 's2_title')}</h3>
                    <p className="skill-description">
                        {t('softSkills', 's2_desc')}
                    </p>
                </div>

                {/* Aprendizaje continuo */}
                <div className="skill-card">
                    <div className="skill-icon-wrapper">
                        <RocketLaunchIcon sx={{ fontSize: 40, color: '#646cff' }} />
                    </div>
                    <h3 className="skill-title">{t('softSkills', 's3_title')}</h3>
                    <p className="skill-description">
                        {t('softSkills', 's3_desc')}
                    </p>
                </div>

            </div>
        </section>
    );
}