import { ProjectsSlider } from './projects-slider'
import { ServicesSection } from './services-section'

export function PlaceholderSections() {
  return (
    <>
      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex flex-col items-center justify-center px-4 py-16"
      >
        <div className="max-w-7xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Our Projects
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Discover our portfolio of innovative solutions
            </p>
          </div>

          <ProjectsSlider />
        </div>
      </section>

      {/* Services Section */}
      <div id="services">
        <ServicesSection />
      </div>

      {/* Additional content section */}
      <section className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-4xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 text-center">
            More Content Below
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-purple-500 transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Feature {item}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Discover amazing capabilities that will transform your experience
                  with cutting-edge technology.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
