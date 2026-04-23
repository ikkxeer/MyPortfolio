import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Iker Aramburu Muñoz</h2>
            </div>

            <ul className="nav-links">
                <li><a href="#">Inicio</a></li>
                <li><a href="#proyectos">Proyectos</a></li>
                <li><a href="#">Contacto</a></li>

            </ul>
        </nav>

    )
}