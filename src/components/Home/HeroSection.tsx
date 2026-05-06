import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import './HeroSection.css'

export default function HeroSection() {
    // Estados del texto y del cursor
    const [text, setText] = useState('')
    const [showCursor, setShowCursor] = useState(true)
    const { t } = useLanguage()

    // Texto a escribir
    const fullText = t('hero', 'developer')

    // Efecto para ir añadiendo letra por letra al cargar
    useEffect(() => {
        let index = 0;
        setText('');
        setShowCursor(true);
        const interval = setInterval(() => {
            setText(fullText.slice(0, index + 1));
            index++;

            // Al finalizar la frase, el intervalo de tiempo se detiene
            if (index >= fullText.length) {
                clearInterval(interval);
                setShowCursor(false);
            }
        }, 70);

        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="profile-photo-wrapper">
                    <img src="/foto_perfil.png" alt="Iker Aramburu Muñoz" className="profile-photo" />
                </div>

                <div className="hero-text">
                    <h1>Iker Aramburu Muñoz</h1>

                    <p className="specialty">
                        <span className="ghost-text">
                            <span className="glowing-tag">&lt;h1&gt;</span>
                            {fullText}
                            <span>|</span>
                            <span className="glowing-tag">&lt;/h1&gt;</span>
                        </span>

                        <span className="typing-text">
                            <span className="glowing-tag">&lt;h1&gt;</span>
                            {text}
                            <span className="typing-cursor" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
                            <span className="glowing-tag">&lt;/h1&gt;</span>
                        </span>
                    </p>

                    <p className="bio">
                        {t('hero', 'bio')}
                    </p>

                    <div className="hero-buttons">
                        <a href="#" className="btn-primary">{t('hero', 'downloadCV')}</a>
                        <a href="#contacto" className="btn-secondary">{t('hero', 'contact')}</a>
                    </div>
                </div>
            </div>
        </section>
    )
}