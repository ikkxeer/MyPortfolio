import { useState, useEffect } from 'react'
import './HeroSection.css'

export default function HeroSection() {
    // Estados del texto y del cursor
    const [text, setText] = useState('')
    const [showCursor, setShowCursor] = useState(true)

    // Texto a escribir
    const fullText = "Desenvolupador d'aplicacions multiplataforma"

    // Efecto para ir añadiendo letra por letra al cargar
    useEffect(() => {
        let index = 0;
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
    }, []);

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
                        Hola! Sóc l'Iker. M'encanta la tecnologia i tot el que està relacionat amb el desenvolupament de programari. M'agrada crear solucions innovadores i estic en aprenentatge constant per millorar les meves habilitats.
                    </p>

                    <div className="hero-buttons">
                        <a href="#" className="btn-primary">Descarregar CV</a>
                        <a href="#contacto" className="btn-secondary">Contactar</a>
                    </div>
                </div>
            </div>
        </section>
    )
}