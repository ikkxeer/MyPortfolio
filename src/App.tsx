import './App.css'
import AuroraBackground from './components/AuroraBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ScrollIndicator from './components/ScrollIndicator'
import TechSection from './components/TechSection'
import ProjectSection from './components/ProjectSection'
import AnimacionGeneralScroll from './components/AnimacionGeneralScroll'

function App() {
  return (
    <div>
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
    </div>
  )
}

export default App