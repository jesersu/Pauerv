'use client'

import { useState, useEffect } from 'react'
import { getServices, type Service } from '@/services/servicesService'
import { ServiceCard } from './service-card'

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            We offer a wide range of services to help bring your ideas to life
            with cutting-edge technology and expert craftsmanship.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
