import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Pauerv
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We transform ideas into exceptional digital experiences through innovation, creativity, and cutting-edge technology.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-600 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-600 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-600 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-900 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#hero"
                  className="text-sm hover:text-purple-400 transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-sm hover:text-purple-400 transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm hover:text-purple-400 transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm hover:text-purple-400 transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm hover:text-purple-400 transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-sm hover:text-purple-400 transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm hover:text-purple-400 transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Mobile Apps
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm hover:text-purple-400 transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm hover:text-purple-400 transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Cloud Solutions
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm hover:text-purple-400 transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <a href="mailto:contact@pauerv.com" className="hover:text-purple-400 transition-colors">
                    contact@pauerv.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <a href="tel:+15551234567" className="hover:text-purple-400 transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  123 Innovation Drive<br />
                  Tech Valley, CA 94000
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Pauerv. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
