'use client'

import { useEffect, useRef, useState } from 'react'

interface Drop {
  id: number
  left: string
  delay: number
  size: number
  opacity: number
}

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [floatingDrops, setFloatingDrops] = useState<Drop[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  // Generate floating drops on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate scroll progress relative to section
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)))

      setScrollProgress(progress)

      // Generate drops as user scrolls toward section
      if (progress > 0.1 && progress < 0.8 && floatingDrops.length < 12) {
        if (Math.random() > 0.95) {
          const newDrop: Drop = {
            id: Date.now() + Math.random(),
            left: `${Math.random() * 90 + 5}%`,
            delay: 0,
            size: Math.random() * 30 + 20,
            opacity: Math.random() * 0.3 + 0.2,
          }
          setFloatingDrops(prev => [...prev, newDrop])

          setTimeout(() => {
            setFloatingDrops(prev => prev.filter(d => d.id !== newDrop.id))
          }, 4000)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [floatingDrops.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const mainDrops = [
    {
      shape: 'circle',
      title: 'Our Mission',
      content: 'To transform innovative ideas into exceptional digital experiences that make a lasting impact.',
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
      delay: 0,
    },
    {
      shape: 'clover',
      title: 'Our Values',
      content: 'Innovation, integrity, and excellence drive everything we do. We believe in creating solutions that matter.',
      gradient: 'from-pink-400 via-pink-500 to-pink-600',
      delay: 200,
    },
    {
      shape: 'ghost',
      title: 'Our Vision',
      content: 'Building a future where technology empowers everyone to achieve their dreams and aspirations.',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      delay: 400,
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-20 md:py-32"
    >
      {/* Floating Drops (appear while scrolling) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingDrops.map((drop) => (
          <div
            key={drop.id}
            className="absolute bottom-0 floating-drop"
            style={{
              left: drop.left,
              width: `${drop.size}px`,
              height: `${drop.size}px`,
              opacity: drop.opacity,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-sm animate-float-up-morph" />
          </div>
        ))}
      </div>

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            About Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a passionate team dedicated to crafting digital experiences that inspire and innovate.
          </p>
        </div>

        {/* Main Liquid Drops with Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mb-20">
          {mainDrops.map((drop, index) => (
            <div
              key={index}
              className={`relative transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${drop.delay}ms` }}
            >
              {/* Liquid Drop Container */}
              <div className="relative mx-auto" style={{ width: '280px', height: '320px' }}>
                {/* Drop Shape with Morphing Animation */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${drop.gradient} shadow-2xl animate-morph-${drop.shape}`}
                  style={{
                    clipPath: getClipPath(drop.shape),
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                  }}
                >
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-white opacity-20 blur-xl" />

                  {/* Shine Effect */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full opacity-30 blur-2xl animate-pulse-slow" />
                </div>

                {/* Content Inside Drop */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-700 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${drop.delay + 400}ms` }}
                >
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                    {drop.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                    {drop.content}
                  </p>
                </div>

                {/* Ripple Effect on Hover */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 animate-ripple bg-white rounded-full" style={{ clipPath: getClipPath(drop.shape) }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section with Liquid Effect */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Animated Liquid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 animate-wave" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              }}></div>
            </div>

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '150+', label: 'Projects Completed' },
                { value: '50+', label: 'Happy Clients' },
                { value: '10+', label: 'Years Experience' },
                { value: '24/7', label: 'Support Available' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group cursor-default"
                  style={{
                    animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none',
                  }}
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-white/90 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-xl md:text-2xl text-gray-700 mb-6">
            Ready to bring your vision to life?
          </p>
          <a
            href="#contact"
            className="!inline-flex !flex-row items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 whitespace-nowrap"
            style={{ display: 'inline-flex', flexDirection: 'row' }}
          >
            <span>Let&apos;s Talk</span>
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

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-up-morph {
          0% {
            transform: translateY(0) scale(1);
            border-radius: 50%;
          }
          25% {
            transform: translateY(-25vh) scale(1.1, 0.9);
            border-radius: 40% 60% 50% 50%;
          }
          50% {
            transform: translateY(-50vh) scale(0.9, 1.2);
            border-radius: 50% 50% 40% 60%;
          }
          75% {
            transform: translateY(-75vh) scale(1.05, 0.95);
            border-radius: 60% 40% 60% 40%;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            border-radius: 50%;
            opacity: 0;
          }
        }

        @keyframes morph-circle {
          0%, 100% {
            border-radius: 50%;
          }
          25% {
            border-radius: 45% 55% 50% 50%;
          }
          50% {
            border-radius: 50% 50% 45% 55%;
          }
          75% {
            border-radius: 55% 45% 55% 45%;
          }
        }

        @keyframes ripple {
          0% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(50%) translateY(-20px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        .floating-drop {
          will-change: transform, opacity;
        }

        .animate-float-up-morph {
          animation: float-up-morph 4s ease-out forwards;
        }

        .animate-morph-circle {
          animation: morph-circle 6s ease-in-out infinite;
        }

        .animate-morph-clover {
          animation: morph-circle 7s ease-in-out infinite reverse;
        }

        .animate-morph-ghost {
          animation: morph-circle 8s ease-in-out infinite;
        }

        .animate-ripple {
          animation: ripple 2s ease-out infinite;
        }

        .animate-wave {
          animation: wave 10s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

// Helper function to generate clip paths for different drop shapes
function getClipPath(shape: string): string {
  switch (shape) {
    case 'circle':
      return 'ellipse(50% 50% at 50% 50%)'
    case 'clover':
      return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
    case 'ghost':
      return 'polygon(50% 0%, 80% 5%, 95% 20%, 98% 40%, 100% 60%, 100% 85%, 90% 100%, 80% 95%, 70% 100%, 60% 95%, 50% 100%, 40% 95%, 30% 100%, 20% 95%, 10% 100%, 0% 85%, 0% 60%, 2% 40%, 5% 20%, 20% 5%)'
    default:
      return 'ellipse(50% 50% at 50% 50%)'
  }
}
