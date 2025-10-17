import { ProjectsSlider } from './projects-slider'
import { ServicesSection } from './services-section'
import { AboutSection } from './about-section'
import { ContactSection } from './contact-section'

export function PlaceholderSections() {
  return (
    <>
      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
      >
        <div className="max-w-7xl w-full">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3">
              Our Projects
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto px-4">
              Discover our portfolio of innovative solutions
            </p>
          </div>

          <ProjectsSlider
            images={[
              '/images/project/project-1.png',
              '/images/project/project2.jpg',
              '/images/project/project3.jpg',
              '/images/project/project4.jpg',
              '/images/project/project5.jpg',
            ]}
            viewportHeightCss="50svh"
            cardHeightRatio={0.72}
            spacingPx={48}
            neighborScale={0.85}
            outerScale={0.7}
          />
        </div>
      </section>

      {/* Services Section */}
      <div id="services">
        <ServicesSection />
      </div>

      {/* About Us Section */}
      <AboutSection />

      {/* Contact Us Section */}
      <ContactSection />
    </>
  )
}
