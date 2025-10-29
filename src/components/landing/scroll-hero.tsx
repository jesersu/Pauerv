'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { imagePlaceholders } from '@/lib/image-placeholders'
import { TechCarousel } from './tech-carousel'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export function ScrollHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinWrapperRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Initial text refs (SOFTWARE FOR YOU)
  const text1Row1Ref = useRef<HTMLDivElement>(null)
  const text1Row2Ref = useRef<HTMLDivElement>(null)
  const text1Row3Ref = useRef<HTMLDivElement>(null)

  // Image refs
  const imageTopRef = useRef<HTMLDivElement>(null)
  const imageBottomRef = useRef<HTMLDivElement>(null)

  // Final text refs (WE BUILD FOR YOU)
  const text2Row1Ref = useRef<HTMLDivElement>(null)
  const text2Row2Ref = useRef<HTMLDivElement>(null)
  const text2Row3Ref = useRef<HTMLDivElement>(null)

  // Track screen size for mobile/desktop layouts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960)
    }

    // Set initial value
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // useGSAP provides automatic cleanup and better React integration
  useGSAP(() => {
    // Skip GSAP animations on mobile
    if (isMobile) return
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const section = sectionRef.current
    const pinWrapper = pinWrapperRef.current

    const text1Row1 = text1Row1Ref.current
    const text1Row2 = text1Row2Ref.current
    const text1Row3 = text1Row3Ref.current

    const imageTop = imageTopRef.current
    const imageBottom = imageBottomRef.current

    const text2Row1 = text2Row1Ref.current
    const text2Row2 = text2Row2Ref.current
    const text2Row3 = text2Row3Ref.current

    if (!section || !pinWrapper || !text1Row1 || !text1Row2 || !text1Row3 ||
        !imageTop || !imageBottom || !text2Row1 || !text2Row2 || !text2Row3) return

    // If user prefers reduced motion, show elements immediately without animation
    if (prefersReducedMotion) {
      gsap.set([text1Row1, text1Row2, text1Row3, imageTop, imageBottom], { opacity: 1, scale: 1, y: 0 })
      gsap.set(section, { background: 'linear-gradient(to bottom, #0f172a, #1e40af, #0f172a)' })
      return
    }

    // Get responsive values based on screen size
    const getResponsiveValues = () => {
      const width = window.innerWidth

      if (width < 640) {
        // Mobile
        return {
          imageTop: { left: '35%', top: '35%' },
          imageBottom: { left: '65%', bottom: '30%' },
          textOffset: 100
        }
      } else if (width < 1024) {
        // Tablet
        return {
          imageTop: { left: '32%', top: '32%' },
          imageBottom: { left: '70%', bottom: '32%' },
          textOffset: 150
        }
      } else {
        // Desktop
        return {
          imageTop: { left: '30%', top: '30%' },
          imageBottom: { left: '75%', bottom: '35%' },
          textOffset: 200
        }
      }
    }

    // Get initial responsive values
    const initialValues = getResponsiveValues()

    // Set initial background gradient (blue/cyan tech colors)
    gsap.set(section, {
      background: 'linear-gradient(135deg, #0f172a 0%, #0891b2 50%, #38bdf8 100%)'
    })

    // Make first text visible immediately on page load
    gsap.set([text1Row1, text1Row2, text1Row3], {
      opacity: 1,
      y: 0,
      scale: 1
    })

    // Set initial positions for final text (responsive)
    gsap.set(text2Row1, { x: -initialValues.textOffset })
    gsap.set(text2Row2, { x: initialValues.textOffset })
    gsap.set(text2Row3, { x: -initialValues.textOffset })

    // Initial timeline for entrance animations (before scroll)
    const introTl = gsap.timeline()

    // Show the two images after 1 second
    introTl.to([imageTop, imageBottom], {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.15,
      ease: 'back.out(0.4)'
    }, '+=1')

    // Track if intro should be killed when scrolling starts
    let scrollStarted = false

    // Scroll listener to detect when user starts scrolling
    const handleScroll = () => {
      if (!scrollStarted && window.scrollY > 0) {
        scrollStarted = true
        // Kill intro timeline immediately when scrolling starts
        introTl.kill()
        // Ensure all elements are in their starting positions for scroll animation
        gsap.set([imageTop, imageBottom], { opacity: 1, scale: 1 })
        gsap.set([text1Row1, text1Row2, text1Row3], { opacity: 1, scale: 1, y: 0 })
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Function to create/update scroll animations with responsive values
    const createScrollAnimation = () => {
      const values = getResponsiveValues()

      // Main scroll-triggered timeline - ALL animations tied to scroll position
      gsap.timeline({
        scrollTrigger: {
          trigger: section,              // Element that triggers the animation
          start: 'top top',              // Animation starts when top of trigger hits top of viewport
          end: 'bottom bottom',          // Animation ends when bottom of trigger hits bottom of viewport
          pin: pinWrapper,               // Element to pin in place during scroll
          scrub: 1,                      // Smooth scrubbing (animations follow scroll position)
          anticipatePin: 1,              // Helps prevent jumps when pinning starts
          invalidateOnRefresh: true,     // Recalculate on resize
        }
      })
      // Phase 1: Background color transition (beginning of scroll)
      .to(section, {
        background: 'linear-gradient(to bottom, #0f172a, #1e40af, #0f172a)',
        duration: 1,
        ease: 'none'
      }, 0)

      // Phase 2: Move images to center + hide first text (start to middle of scroll)
      .to(imageTop, {
        left: values.imageTop.left,
        top: values.imageTop.top,
        x: '-50%',
        y: '-50%',
        duration: 2,
        ease: 'none'
      }, 0)
      .to(imageBottom, {
        left: values.imageBottom.left,
        bottom: values.imageBottom.bottom,
        x: '-50%',
        y: '50%',
        duration: 2,
        ease: 'none'
      }, 0)
      .to([text1Row1, text1Row2, text1Row3], {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'none'
      }, 0)

      // Phase 3: Show "WE BUILD FOR YOU" text (middle to end of scroll - when images finish moving)
      .to(text2Row1, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'none'
      }, 1)  // Start when images are 75% done moving
      .to(text2Row2, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'none'
      }, 1)
      .to(text2Row3, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'none'
      }, 1)
    }

    // Create initial animation
    createScrollAnimation()

    // Debounced resize handler for better performance
    let resizeTimer: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 250)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup: useGSAP automatically reverts animations, we just need to clean up event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, { scope: sectionRef, dependencies: [isMobile] }) // Scope ensures animations are contained to this component

  // Mobile layout (< 960px) - No animations, normal scroll
  if (isMobile) {
    return (
      <div
        ref={sectionRef}
        className="relative pt-28 sm:pt-32 pb-12 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(to bottom, #0f172a, #1e40af, #0f172a)'
        }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 sm:gap-8">
          {/* Row 1: Smart Solution - Under navbar */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-josefin text-center">
            Smart solution
          </h1>

          {/* Row 2: Solid results */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-josefin text-center">
            Solid results
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white font-josefin-slab text-center max-w-2xl px-4">
            Turning ideas into high-performing technology
          </p>

          {/* Row 3: Animation Video - Full animation visible */}
          <div className="w-full max-w-sm mx-auto">
            <video
              className="w-full h-auto max-h-[500px] object-contain"
              autoPlay
              loop
              muted
              playsInline
              poster="/images/top-image.png"
            >
              <source src="/videos/scroll-hero-animation.mov" type="video/quicktime" />
              <source src="/videos/scroll-hero-animation.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Row 4: Our Projects Button */}
          <Link
            href="#projects"
            className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-cyan-600 hover:bg-cyan-500 text-white text-lg sm:text-xl font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-400 focus:ring-opacity-50"
            aria-label="View our projects"
          >
            Our projects
          </Link>

          {/* Row 5: Contact Us */}
          <Link
            href="#contact"
            className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white text-lg sm:text-xl font-bold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            aria-label="Contact us"
          >
            Contact us
          </Link>
        </div>
      </div>
    )
  }

  // Desktop layout (>= 960px)
  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{
        height: '400vh', // Extra height to allow scrolling through animation
        background: 'linear-gradient(135deg, #0f172a 0%, #0891b2 50%, #38bdf8 100%)' // Initial blue/cyan tech gradient
      }}
    >
      {/* Container that will be pinned */}
      <div
        ref={pinWrapperRef}
        className="h-screen flex flex-col relative overflow-visible pt-20 z-[60]"
      >
        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center relative overflow-visible px-4 sm:px-6 md:px-8">
        {/* Initial Text: Smart solution, Solid results */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 px-4">
          <div
            ref={text1Row1Ref}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white opacity-0 font-josefin text-center"
            style={{ transform: 'translateY(50px)' }}
          >
            Smart solution
          </div>
          <div
            ref={text1Row2Ref}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white opacity-0 font-josefin text-center"
            style={{ transform: 'translateY(50px)' }}
          >
            Solid results
          </div>
          <div
            ref={text1Row3Ref}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white opacity-0 font-josefin-slab text-center max-w-4xl px-4"
            style={{ transform: 'translateY(50px)' }}
          >
            Turning ideas into high-performing technology
          </div>
        </div>

        {/* Images */}
        {/* Top Left Image */}
        <div
          ref={imageTopRef}
          className="absolute top-[-8%] left-[5%] sm:left-[8%] md:left-[10%] w-48 sm:w-56 md:w-72 lg:w-80 xl:w-96 opacity-0 z-[1000]"
          style={{
            scale: 0.8
          }}
        >
          <Image
            src="/images/top-image.png"
            alt="Software development showcase - top image"
            width={384}
            height={384}
            className="w-full h-auto object-contain drop-shadow-2xl"
            priority
            quality={90}
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 288px, (max-width: 1280px) 320px, 384px"
            placeholder="blur"
            blurDataURL={imagePlaceholders.gradient}
          />
        </div>

        {/* Bottom Right Image */}
        <div
          ref={imageBottomRef}
          className="absolute bottom-[-5%] right-[5%] sm:right-[8%] md:right-[10%] w-24 sm:w-32 md:w-48 lg:w-64 xl:w-80 opacity-0"
          style={{
            scale: 0.8
          }}
        >
          <Image
            src="/images/bottom-image.png"
            alt="Mobile application showcase - bottom image"
            width={320}
            height={320}
            className="w-full h-auto object-contain drop-shadow-2xl"
            priority
            quality={90}
            sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 192px, (max-width: 1280px) 256px, 320px"
            placeholder="blur"
            blurDataURL={imagePlaceholders.pink}
          />
        </div>

        {/* Final Text: WE BUILD FOR YOU */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-4">
          <div
            ref={text2Row1Ref}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white opacity-0 text-center"
          >
            WE
          </div>
          <div
            ref={text2Row2Ref}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white opacity-0 text-center"
          >
            BUILD
          </div>
          <div
            ref={text2Row3Ref}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white opacity-0 text-center"
          >
            FOR YOU
          </div>
        </div>
        </div>

        {/* Tech Stack Carousel at the bottom */}
        {/* <div className="absolute bottom-0 left-0 right-0">
          <TechCarousel />
        </div> */}
      </div>
    </div>
  )
}
