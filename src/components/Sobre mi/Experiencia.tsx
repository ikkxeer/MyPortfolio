import "./Experiencia.css";
import { useLanguage } from "../../context/LanguageContext";

export default function Experiencia() {
    const { t } = useLanguage();

    return (
        <section className="experiencia-section">
            <div className="experiencia-container">
                <div className="experiencia-header">
                    <h1 className="experiencia-main-title">{t("experiencia", "titulo") || "Experiencia"}</h1>
                </div>

                <div className="experiencia-grid">
                    {/* CoMB - Prácticas */}
                    <div className="experiencia-item">
                        <div className="experiencia-dot"></div>
                        <div className="experiencia-content">
                            <span className="empresa">{t("experiencia", "exp4_empresa")}</span>
                            <span className="experiencia-year">{t("experiencia", "exp4_fecha")}</span>
                            <h3 className="experiencia-title">{t("experiencia", "exp4_puesto")}</h3>
                            <p className="skills-learned">Skills aprendidas</p>
                            <div className="skills">
                                <p>Gestión bajo presión</p>
                                <p>Comunicación</p>
                                <p>Trabajo en equipo</p>
                                <p>Responsabilidad</p>
                                <p>Organización</p>
                            </div>
                            <p className="experiencia-description">
                                {t("experiencia", "exp4_desc")}
                            </p>
                        </div>
                    </div>

                    {/* CoMB - Administrador */}
                    <div className="experiencia-item">
                        <div className="experiencia-dot"></div>
                        <div className="experiencia-content">
                            <span className="empresa">{t("experiencia", "exp3_empresa")}</span>
                            <span className="experiencia-year">{t("experiencia", "exp3_fecha")}</span>
                            <h3 className="experiencia-title">{t("experiencia", "exp3_puesto")}</h3>
                            <p className="experiencia-description">
                                {t("experiencia", "exp3_desc")}
                            </p>
                            <p className="skills-learned">Skills aprendidas</p>
                            <div className="skills">
                                <p>Gestión bajo presión</p>
                                <p>Comunicación</p>
                                <p>Trabajo en equipo</p>
                                <p>Responsabilidad</p>
                                <p>Organización</p>
                            </div>
                        </div>
                    </div>

                    {/* FLUGE AUDIOVISUALES */}
                    <div className="experiencia-item">
                        <div className="experiencia-dot"></div>
                        <div className="experiencia-content">
                            <span className="empresa">{t("experiencia", "exp2_empresa")}</span>
                            <span className="experiencia-year">{t("experiencia", "exp2_fecha")}</span>
                            <h3 className="experiencia-title">{t("experiencia", "exp2_puesto")}</h3>
                            <p className="experiencia-description">
                                {t("experiencia", "exp2_desc")}
                            </p>
                            <p className="skills-learned">Skills aprendidas</p>
                            <div className="skills">
                                <p>Clonezilla</p>
                                <p>Virtualización de sistemas operativos</p>
                                <p>Automatización</p>
                                <p>Puente de depuración de Android</p>
                            </div>
                        </div>
                    </div>

                    {/* NARGY */}
                    <div className="experiencia-item">
                        <div className="experiencia-dot"></div>
                        <div className="experiencia-content">
                            <span className="empresa">{t("experiencia", "exp1_empresa")}</span>
                            <span className="experiencia-year">{t("experiencia", "exp1_fecha")}</span>
                            <h3 className="experiencia-title">{t("experiencia", "exp1_puesto")}</h3>
                            <p className="experiencia-description">
                                {t("experiencia", "exp1_desc")}
                            </p>
                            <p className="skills-learned">Skills aprendidas</p>
                            <div className="skills">
                                <p>Ubuntu</p>
                                <p>Virtualización de sistemas operativos</p>
                                <p>Redes</p>
                                <p>Mantenimiento de equipos informáticos</p>
                                <p>Soporte técnico</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}