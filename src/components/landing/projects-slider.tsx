'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getProjects, type Project } from '@/services/projectsService'

export function ProjectsSlider() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection('left')
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setTimeout(() => {
      setIsTransitioning(false)
      setDirection(null)
    }, 600)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection('right')
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setTimeout(() => {
      setIsTransitioning(false)
      setDirection(null)
    }, 600)
  }

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + projects.length) % projects.length
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, isTransitioning])

  // Show loading state
  if (isLoading || projects.length === 0) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="text-white text-xl">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 md:left-8 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group border border-white/20"
        aria-label="Previous project"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 md:right-8 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group border border-white/20"
        aria-label="Next project"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slider Container */}
      <div className="relative w-full h-full flex items-center justify-center px-4 md:px-16">
        {/* Left Side Image */}
        <div
          className="hidden md:block absolute left-[5%] lg:left-[10%] w-[200px] lg:w-[280px] h-[280px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl opacity-40 transform scale-90 transition-all duration-600 hover:opacity-60"
          style={{
            transform: `scale(0.85) translateX(${
              isTransitioning
                ? direction === 'right'
                  ? '100px'
                  : '-100px'
                : '0'
            })`,
            opacity: isTransitioning && direction === 'right' ? '0.7' : '0.4',
          }}
        >
          <Image
            src={projects[getSlideIndex(-1)].image}
            alt={projects[getSlideIndex(-1)].title}
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>

        {/* Center Main Image */}
        <div
          className="relative w-full max-w-[500px] md:max-w-[600px] h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-600"
          style={{
            transform: `perspective(1000px) translateX(${
              isTransitioning
                ? direction === 'left'
                  ? '-50px'
                  : '50px'
                : '0'
            }) scale(${isTransitioning ? '0.95' : '1'}) rotateY(${
              isTransitioning
                ? direction === 'left'
                  ? '-5deg'
                  : '5deg'
                : '0deg'
            })`,
            opacity: isTransitioning ? '0.6' : '1',
          }}
        >
          <Image
            src={projects[currentIndex].image}
            alt={projects[currentIndex].title}
            fill
            className="object-cover transition-transform duration-600"
            priority
            sizes="(max-width: 768px) 100vw, 600px"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {projects[currentIndex].title}
            </h3>
            <p className="text-gray-200 mb-4 text-sm md:text-base">
              {projects[currentIndex].description}
            </p>

            {/* Learn More Button */}
            <a
              href={projects[currentIndex].link}
              className="!inline-flex !flex-row items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap"
              style={{ display: 'inline-flex', flexDirection: 'row' }}
            >
              Learn more
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side Image */}
        <div
          className="hidden md:block absolute right-[5%] lg:right-[10%] w-[200px] lg:w-[280px] h-[280px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl opacity-40 transform scale-90 transition-all duration-600 hover:opacity-60"
          style={{
            transform: `scale(0.85) translateX(${
              isTransitioning
                ? direction === 'left'
                  ? '100px'
                  : '-100px'
                : '0'
            })`,
            opacity: isTransitioning && direction === 'left' ? '0.7' : '0.4',
          }}
        >
          <Image
            src={projects[getSlideIndex(1)].image}
            alt={projects[getSlideIndex(1)].title}
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true)
                setDirection(index > currentIndex ? 'left' : 'right')
                setCurrentIndex(index)
                setTimeout(() => {
                  setIsTransitioning(false)
                  setDirection(null)
                }, 600)
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
