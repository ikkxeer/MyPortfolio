import { useState } from 'react';
import './Navbar.css'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Iker Aramburu Muñoz</h2>
            </div>

            {/* Boton menu hamburguesa */}
            <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li><a href="#" onClick={() => setIsOpen(false)}>Inicio</a></li>
                <li><a href="#proyectos" onClick={() => setIsOpen(false)}>Proyectos</a></li>
                <li><a href="#tecnologias" onClick={() => setIsOpen(false)}>Tecnologías</a></li>
                <li><a href="#" onClick={() => setIsOpen(false)}>Contacto</a></li>
            </ul>
        </nav>
    )
}