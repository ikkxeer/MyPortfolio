import './ContactSection.css';

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

        </section>
    )
}