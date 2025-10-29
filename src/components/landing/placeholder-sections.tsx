import { ProjectsSection } from './projects-section'
import { ServicesSection } from './services-section'
import { AboutSection } from './about-section'
import { ContactSection } from './contact-section'

export function PlaceholderSections() {
  return (
    <>
      {/* Projects Section */}
      <ProjectsSection />

      {/* Services Section */}
      <div id="services">
        <ServicesSection />
      </div>

      {/* About Us Section */}
      {/* <AboutSection /> */}

      {/* Contact Us Section */}
      <ContactSection />
    </>
  )
}
