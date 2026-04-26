import "./SobreMi.css"
import { Box, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Timeline from "../components/Sobre mi/Timeline";
import AnimacionGeneralScroll from "../components/Home/AnimacionGeneralScroll";

export default function SobreMi() {
  return (
    <div>
      <section className="section-about-me" id="sobre-mi">
          <div className="about-content">

              <div className="about-image-wrapper">
                  <img src="/foto_perfil.png" alt="Iker Aramburu" className="my-image" />
              </div>

              <div className="about-text-wrapper">
                  <h1 className="title">Sobre mí</h1>

                  <p className="subtitle">
                    Bueno, ya que os habéis interesado un poco, os voy a contar un poco más sobre mí y a qué viene todo mi interés por la informática y la tecnología en general, aunque no soy un genio, soy un apasionado...
                  </p>

                  <Box className="social-container">
                      <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer">
                          <IconButton className="icon-btn" sx={{ '&:hover': { color: '#0A66C2' } }}>
                              <LinkedInIcon fontSize="large" />
                          </IconButton>
                      </a>

                      <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer">
                          <IconButton className="icon-btn" sx={{ '&:hover': { color: '#ffffff' } }}>
                              <GitHubIcon fontSize="large" />
                          </IconButton>
                      </a>

                      <a href="https://youtube.com/@tu-canal" target="_blank" rel="noopener noreferrer">
                          <IconButton className="icon-btn" sx={{ '&:hover': { color: '#FF0000' } }}>
                              <YouTubeIcon fontSize="large" />
                          </IconButton>
                      </a>
                  </Box>
              </div>


          </div>


      </section>
      
      <button className="button-descubrir" onClick={() => window.location.hash = 'trayectoria'}>
        Vamos a seguir conociéndonos
      </button>

      <hr className="dividiendo-secciones" />

      <AnimacionGeneralScroll>
        <Timeline />
      </AnimacionGeneralScroll>

    </div>
  )
}