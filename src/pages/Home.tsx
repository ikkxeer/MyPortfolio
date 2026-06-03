import HeroSection from '../components/Home/HeroSection'
import ScrollIndicator from '../components/Home/ScrollIndicator'
import TechSection from '../components/Home/TechSection'
import ProjectSection from '../components/Home/ProjectSection'
import ContactSection from '../components/Home/ContactSection'
import AnimacionGeneralScroll from '../components/All/AnimacionGeneralScroll'

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
        <ContactSection />
      </AnimacionGeneralScroll>
    </>
  )
}