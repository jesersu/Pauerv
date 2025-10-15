'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '#projects', label: 'Projects' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About us' },
    { href: '#contact', label: 'Contact us' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <nav aria-label="Main navigation" className="hidden md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

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
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  role="listitem"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </nav>
  )
}
