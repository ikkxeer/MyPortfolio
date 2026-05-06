import "./Experiencia.css";
import { useLanguage } from "../../context/LanguageContext";

export default function Experiencia() {
    const { t } = useLanguage();

    return (
        <section className="experiencia-section">
            <div className="experiencia-container">
                <div className="experiencia-header">
                    <h1>Experiencia</h1>
                </div>
            </div>
        </section>
    )
}