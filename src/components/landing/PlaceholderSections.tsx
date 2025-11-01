import { ProjectsSection } from './ProjectsSection'
import { ServicesSection } from './ServicesSection'
import { AboutSection } from './AboutSection'
import { ContactSection } from './ContactSection'

export function PlaceholderSections() {
  return (
    <>
      {/* Projects Section */}
      <ProjectsSection />

      {/* Services Section */}
      <div id="services" className="scroll-offset">
        <ServicesSection />
      </div>

      {/* About Us Section */}
      {/* <AboutSection /> */}

      {/* Contact Us Section */}
      <ContactSection />
    </>
  )
}
