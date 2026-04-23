import HeroSection from '../components/HeroSection'
import ScrollIndicator from '../components/ScrollIndicator'
import TechSection from '../components/TechSection'
import ProjectSection from '../components/ProjectSection'
import VideosSection from '../components/VideosSection'
import ContactSection from '../components/ContactSection'
import AnimacionGeneralScroll from '../components/AnimacionGeneralScroll'

export default function Home() {
  return (
    <>
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
    </>
  )
}