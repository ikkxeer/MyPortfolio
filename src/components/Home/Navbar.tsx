import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.css'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'ca' ? 'en' : 'ca');
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <a href="/"><img src="/logo.png" alt="Logo Iker" width={"60px"} height={"60px"} /></a>
            </div>

            {/* Boton menu hamburguesa */}
            <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li><a href="/#" className="nav-inicio" onClick={() => setIsOpen(false)}>{t('navbar', 'inicio')}</a></li>
                <li><a href="/sobre-mi" className="nav-sobre-mi" onClick={() => setIsOpen(false)}>{t('navbar', 'sobreMi')}</a></li>
                <li><a href="/asignaturas" className="nav-asignaturas" onClick={() => setIsOpen(false)}>{t('navbar', 'asignaturas')}</a></li>

                {/* Switcher de idioma */}
                <li className="lang-switcher-container">
                    <button className="lang-btn" onClick={toggleLanguage} aria-label="Cambiar idioma">
                        <span className={`lang-text ${language === 'ca' ? 'active' : ''}`}>CA</span>
                        <span className="lang-separator">/</span>
                        <span className={`lang-text ${language === 'en' ? 'active' : ''}`}>EN</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}