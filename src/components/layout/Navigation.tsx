'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { LAYOUT, Z_INDEX } from '@/config/constants'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export function Navigation() {
  const t = useTranslations('navigation')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProjectsSection, setIsProjectsSection] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const menuItems = [
    { href: '#projects', label: t('projects') },
    { href: '#services', label: t('services') },
    { href: '#contact', label: t('contact') },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      // Calculate offset for fixed navbar
      const navbarHeight = LAYOUT.NAVBAR.HEIGHT_DESKTOP
      const offset = LAYOUT.NAVBAR.SCROLL_OFFSET
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setIsMenuOpen(false)
    }
  }

  // Detect when user reaches projects section and onwards
  useEffect(() => {
    const handleScroll = () => {
      // Check scroll position
      setIsScrolled(window.scrollY > 50)

      const projectsSection = document.querySelector('#projects')
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect()
        // Check if user has reached or scrolled past the projects section
        const isAtOrPastProjects = rect.top <= 100
        setIsProjectsSection(isAtOrPastProjects)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        isProjectsSection
          ? 'bg-black/80 backdrop-blur-lg border-white/10 shadow-lg'
          : 'bg-transparent border-white/5'
      }`}
      style={{ zIndex: Z_INDEX.NAVIGATION }}
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold text-white">
                Pauerv
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <nav aria-label="Main navigation" className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="md:hidden py-4 border-t border-white/10 bg-black/90 backdrop-blur-md"
          >
            <div className="flex flex-col space-y-3" role="list">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-gray-300 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  role="listitem"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-3 border-t border-white/10">
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        )}
      </div>
    </nav>
  )
}
