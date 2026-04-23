import './App.css'
import AuroraBackground from './components/AuroraBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ScrollIndicator from './components/ScrollIndicator'
import TechSection from './components/TechSection'
import ProjectSection from './components/ProjectSection'
import AnimacionGeneralScroll from './components/AnimacionGeneralScroll'
import VideosSection from './components/VideosSection'
import ContactSection from './components/ContactSection'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <div>
      <CustomCursor />
      <AuroraBackground />

      <Navbar />
      <HeroSection />

      <AnimacionGeneralScroll>
        <ScrollIndicator />
      </AnimacionGeneralScroll>

      <AnimacionGeneralScroll>
        <TechSection />
      </AnimacionGeneralScroll>

      <AnimacionGeneralScroll>
        <ProjectSection />
      </AnimacionGeneralScroll>

      <AnimacionGeneralScroll>
        <VideosSection />
      </AnimacionGeneralScroll>

      <AnimacionGeneralScroll>
        <ContactSection />
      </AnimacionGeneralScroll>
    </div>
  )
}

export default App