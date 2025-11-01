'use client'

import { useEffect, useRef } from 'react'

interface TechItem {
  name: string
  icon: string // We'll use emoji/text for now, can be replaced with actual icons
  color: string
}

const techStack: TechItem[] = [
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'Swift', icon: '🍎', color: '#FA7343' },
  { name: 'JavaScript', icon: 'JS', color: '#F7DF1E' },
  { name: 'Java', icon: '☕', color: '#007396' },
  { name: 'Node.js', icon: '⬢', color: '#339933' },
  { name: 'GitHub', icon: '🐙', color: '#181717' },
  { name: 'AWS', icon: '☁️', color: '#FF9900' },
  { name: 'Azure', icon: '☁️', color: '#0078D4' },
  { name: 'Kotlin', icon: 'K', color: '#7F52FF' },
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'HTML', icon: 'HTML', color: '#E34F26' },
  { name: 'CSS', icon: 'CSS', color: '#1572B6' },
]

export function TechCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let animationFrameId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame

    const animate = () => {
      if (!carousel) return

      scrollPosition += scrollSpeed

      // Reset position when we've scrolled through half the content
      // (since we duplicate the items)
      const scrollWidth = carousel.scrollWidth / 2

      if (scrollPosition >= scrollWidth) {
        scrollPosition = 0
      }

      carousel.style.transform = `translateX(-${scrollPosition}px)`
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  // Duplicate items for seamless loop
  const duplicatedStack = [...techStack, ...techStack]

  return (
    <div className="w-full overflow-hidden bg-[#10172B] backdrop-blur-sm  py-6">
      <div
        ref={carouselRef}
        className="flex gap-8 md:gap-12"
        style={{ width: 'fit-content' }}
      >
        {duplicatedStack.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex flex-col items-center justify-center min-w-[80px] md:min-w-[100px] group"
          >
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-bold transition-transform group-hover:scale-110 shadow-lg"
              style={{
                backgroundColor: `${tech.color}20`,
                border: `2px solid ${tech.color}40`,
              }}
            >
              <span
                className="drop-shadow-lg"
                style={{
                  color: tech.color,
                  textShadow: `0 0 20px ${tech.color}80`,
                }}
              >
                {tech.icon}
              </span>
            </div>
            <span className="mt-3 text-xs md:text-sm font-medium text-gray-300 whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
