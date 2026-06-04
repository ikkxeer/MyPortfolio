import "./SobreMi.css"
import { Box, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Timeline from "../components/Sobre mi/Timeline";
import AnimacionGeneralScroll from "../components/All/AnimacionGeneralScroll";
import SoftSkills from "../components/Sobre mi/SoftSkills";
import Experiencia from "../components/Sobre mi/Experiencia";
import { useLanguage } from '../context/LanguageContext';

export default function SobreMi() {
  const { t } = useLanguage();

  return (
    <div>
      <section className="section-about-me" id="sobre-mi">
        <div className="about-content">

          <div className="about-image-wrapper">
            <img src="/foto_perfil.png" alt="Iker Aramburu" className="my-image" />
          </div>

          <div className="about-text-wrapper">
            <h1 className="title">{t('sobreMi', 'title')}</h1>

            <p className="subtitle">
              {t('sobreMi', 'subtitle')}
            </p>

            <Box className="social-container">
              <a href="https://www.linkedin.com/in/iker-aramburu/" target="_blank" rel="noopener noreferrer">
                <IconButton className="icon-btn" sx={{ '&:hover': { color: '#0A66C2' } }}>
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              </a>

              <a href="https://github.com/ikkxeer" target="_blank" rel="noopener noreferrer">
                <IconButton className="icon-btn" sx={{ '&:hover': { color: '#ffffff' } }}>
                  <GitHubIcon fontSize="large" />
                </IconButton>
              </a>

              <a href="https://youtube.com/@mi-canal" target="_blank" rel="noopener noreferrer">
                <IconButton className="icon-btn" sx={{ '&:hover': { color: '#FF0000' } }}>
                  <YouTubeIcon fontSize="large" />
                </IconButton>
              </a>
            </Box>
          </div>


        </div>


      </section>

      <button className="button-descubrir" onClick={() => window.location.hash = 'trayectoria'}>
        {t('sobreMi', 'button')}
      </button>

      <hr className="dividiendo-secciones" />

      <AnimacionGeneralScroll>
        <Timeline />
      </AnimacionGeneralScroll>

      <hr className="dividiendo-secciones" />

      <AnimacionGeneralScroll>
        <SoftSkills />
      </AnimacionGeneralScroll>

      <hr className="dividiendo-secciones" />

      <AnimacionGeneralScroll>
        <Experiencia />
      </AnimacionGeneralScroll>

    </div>
  )
}