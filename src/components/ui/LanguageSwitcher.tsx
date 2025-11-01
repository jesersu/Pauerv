'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { useTransition, useState, useEffect, useRef } from 'react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
] as const

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  const handleLanguageChange = (newLocale: 'en' | 'es') => {
    setIsOpen(false)
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
    })
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105 ${
          isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span>{currentLanguage.code.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-white/10 overflow-hidden z-50 animate-fadeIn"
          role="menu"
          aria-label="Language options"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              disabled={isPending}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                locale === language.code
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              role="menuitem"
              aria-label={`Switch to ${language.name}`}
              aria-current={locale === language.code ? 'true' : 'false'}
            >
              <span className="text-2xl">{language.flag}</span>
              <span>{language.name}</span>
              {locale === language.code && (
                <svg
                  className="ml-auto w-5 h-5 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
