import './ContactSection.css';
import { Box, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function ContactSection() {
    return (
        <section className="contact-section" id="contacto">
            <h2 className="section-title">Contacto</h2>
            <p className='contact-description'>¿Tienes un proyecto en mente? ¡Escríbeme y hablemos!</p>

            <form action="https://formspree.io/f/ID_EN_TEORIA" method="POST" className="contact-form">
                <div className="input-group">
                    <input
                        type="text"
                        name="nombre"
                        className="form-input"
                        placeholder="Introduce tu nombre"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="Introduce tu email"
                        required
                    />
                </div>

                <textarea
                    name="mensaje"
                    className="form-textarea"
                    placeholder="¿En qué te puedo ayudar?"
                    rows={5}
                    required
                ></textarea>

                <button type="submit" className="submit-btn">
                    Enviar Mensaje
                </button>

            </form>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                /* Separación entre iconos */
                gap={4}
                /* Margen superior (margin-top) para separarlo del formulario */
                mt={15}
            >

                {/* Linkedin */}
                <a href="https://www.linkedin.com/in/iker-aramburu/" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{
                        color: '#c1c1c1',
                        transition: 'all 0.3s ease',
                        '&:hover': { transform: 'scale(1.2) translateY(-5px)', color: '#0A66C2' }
                    }}>
                        <LinkedInIcon sx={{ fontSize: 45 }} />
                    </IconButton>
                </a>

                {/* Github */}
                <a href="https://github.com/ikkxeer" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{
                        color: '#c1c1c1',
                        transition: 'all 0.3s ease',
                        '&:hover': { transform: 'scale(1.2) translateY(-5px)', color: '#ffffff' }
                    }}>
                        <GitHubIcon sx={{ fontSize: 45 }} />
                    </IconButton>
                </a>

                {/* YT */}
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{
                        color: '#c1c1c1',
                        transition: 'all 0.3s ease',
                        '&:hover': { transform: 'scale(1.2) translateY(-5px)', color: '#FF0000' }
                    }}>
                        <YouTubeIcon sx={{ fontSize: 45 }} />
                    </IconButton>
                </a>
            </Box>

        </section>
    )
}