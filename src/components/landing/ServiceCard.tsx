import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import type { Service } from '@/services/servicesService'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    const button = buttonRef.current

    if (!card || !image || !button) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Hover animation for card
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(image, {
        scale: 1.1,
        rotation: 3,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(image, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-8 overflow-hidden">
        <div ref={imageRef} className="relative w-full h-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-6">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base mb-4 flex-grow">
          {service.description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs md:text-sm font-medium rounded-full border border-purple-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Learn More Button */}
        {/* <a
          ref={buttonRef}
          href={service.link}
          className="!inline-flex !flex-row items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 whitespace-nowrap text-sm md:text-base w-full"
          style={{ display: 'inline-flex', flexDirection: 'row' }}
        >
          <span>Learn more</span>
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a> */}
      </div>
    </div>
  )
}
