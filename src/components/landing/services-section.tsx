'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getServices, type Service } from '@/services/servicesService'
import { ServiceCard } from './service-card'

gsap.registerPlugin(ScrollTrigger)

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Fetch services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)
        const data = await getServices()
        setServices(data)
      } catch (error) {
        console.error('Failed to fetch services:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  // GSAP animations after services are loaded
  useEffect(() => {
    if (isLoading || !services.length) return

    const section = sectionRef.current
    const title = titleRef.current
    const grid = gridRef.current

    if (!section || !title || !grid) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set([title, grid.children], { opacity: 1, y: 0, scale: 1 })
      return
    }

    // Animate title
    gsap.fromTo(
      title,
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Animate service cards with stagger
    const cards = grid.children
    gsap.fromTo(
      cards,
      {
        y: 100,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section || trigger.vars.trigger === grid) {
          trigger.kill()
        }
      })
    }
  }, [isLoading, services])

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            We offer a wide range of services to help bring your ideas to life
            with cutting-edge technology and expert craftsmanship.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
