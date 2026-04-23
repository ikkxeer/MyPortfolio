import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProjectSection from './components/ProjectSection'
import ScrollIndicator from './components/ScrollIndicator'
import TechSection from './components/TechSection'
import AnimacionGeneralScroll from './components/AnimacionGeneralScroll'

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ScrollIndicator />

      {/* Aquí aplicamos la animación a la sección de tecnologías */}
      <AnimacionGeneralScroll>
        <TechSection />
      </AnimacionGeneralScroll>

      {/* Aquí aplicamos la animación a la sección de proyectos */}
      <AnimacionGeneralScroll>
        <ProjectSection />
      </AnimacionGeneralScroll>

    </div>
  )
}

export default App