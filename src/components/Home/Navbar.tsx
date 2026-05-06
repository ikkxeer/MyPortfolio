import { useState } from 'react';
import './Navbar.css'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

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
                <li><a href="/#" className="nav-inicio" onClick={() => setIsOpen(false)}>Inici</a></li>
                <li><a href="/sobre-mi" className="nav-sobre-mi" onClick={() => setIsOpen(false)}>Sobre Mi</a></li>
                <li><a href="/asignaturas" className="nav-asignaturas" onClick={() => setIsOpen(false)}>Assignatures</a></li>
                <li><a href="/#tecnologias" className="nav-tecnologias" onClick={() => setIsOpen(false)}>Tecnologies</a></li>
                <li><a href="/#proyectos" className="nav-proyectos" onClick={() => setIsOpen(false)}>Projectes</a></li>
                <li><a href="/#videos" className="nav-videos" onClick={() => setIsOpen(false)}>Vídeos</a></li>
                <li><a href="/#contacto" className="nav-contacto" onClick={() => setIsOpen(false)}>Contacte</a></li>
            </ul>
        </nav>
    )
}