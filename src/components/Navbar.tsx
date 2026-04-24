import { useState } from 'react';
import './Navbar.css'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="./logo.png" alt="" width={"60px"} height={"60px"} />
            </div>

            {/* Boton menu hamburguesa */}
            <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li><a href="/#" className="nav-inicio" onClick={() => setIsOpen(false)}>Inicio</a></li>
                <li><a href="/sobre-mi" className="nav-sobre-mi" onClick={() => setIsOpen(false)}>Sobre Mí</a></li>
                <li><a href="/#tecnologias" className="nav-tecnologias" onClick={() => setIsOpen(false)}>Tecnologías</a></li>
                <li><a href="/#proyectos" className="nav-proyectos" onClick={() => setIsOpen(false)}>Proyectos</a></li>
                <li><a href="/#videos" className="nav-videos" onClick={() => setIsOpen(false)}>Videos</a></li>
                <li><a href="/#contacto" className="nav-contacto" onClick={() => setIsOpen(false)}>Contacto</a></li>
            </ul>
        </nav>
    )
}