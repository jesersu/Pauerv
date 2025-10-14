'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ScrollHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinWrapperRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return

    const section = sectionRef.current
    const pinWrapper = pinWrapperRef.current
    const product = productRef.current
    const headline = headlineRef.current
    const description = descriptionRef.current

    if (!section || !pinWrapper || !product || !headline || !description) return

    // Create a GSAP timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,              // Element that triggers the animation
        start: 'top top',              // Animation starts when top of trigger hits top of viewport
        end: 'bottom bottom',          // Animation ends when bottom of trigger hits bottom of viewport
        pin: pinWrapper,               // Element to pin in place during scroll
        scrub: 1,                      // Smooth scrubbing (1 second delay for smoothness)
        anticipatePin: 1,              // Helps prevent jumps when pinning starts
        invalidateOnRefresh: true,     // Recalculate on resize
      }
    })

    // Animation 1: Move product image to the left and scale down
    tl.to(product, {
      x: -300,                         // Move 300px to the left
      scale: 0.65,                     // Scale down to 65% of original size
      duration: 1,                     // Relative duration in the timeline
      ease: 'power2.inOut'             // Smooth easing function
    })

    // Animation 2: Slide in the headline from the right
    .to(headline, {
      opacity: 1,                      // Fade in
      x: 0,                            // Move to original position
      duration: 0.8,                   // Slightly faster than previous animation
      ease: 'power2.out'
    }, '-=0.3')                        // Start 0.3 seconds before previous animation ends (overlap)

    // Animation 3: Fade in the description text
    .to(description, {
      opacity: 1,                      // Fade in
      y: 0,                            // Move to original position
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.2')                        // Start 0.2 seconds before previous animation ends

    // Cleanup function
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative bg-gradient-to-b from-black via-gray-900 to-black"
      style={{ height: '400vh' }} // Extra height to allow scrolling through animation
    >
      {/* Container that will be pinned */}
      <div
        ref={pinWrapperRef}
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Product Image Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={productRef}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold shadow-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)'
            }}
          >
            {/* Product placeholder - you can replace this with an actual image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white drop-shadow-lg">PRODUCT</span>
            </div>

            {/* Optional: Animated gradient overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)'
              }}
            />
          </div>
        </div>

        {/* Text Content Container */}
        <div className="absolute right-[5%] lg:right-[10%] w-[90%] sm:w-[80%] md:w-[50%] lg:w-[45%] max-w-2xl">
          <h2
            ref={headlineRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-white"
            style={{
              opacity: 0,
              transform: 'translateX(50px)'
            }}
          >
            Revolutionary
            <br />
            Design
          </h2>

          <p
            ref={descriptionRef}
            className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300"
            style={{
              opacity: 0,
              transform: 'translateY(20px)'
            }}
          >
            Experience the future of technology with our innovative approach.
            Built with precision and crafted for perfection, this product
            transforms the way you interact with the digital world.
          </p>
        </div>
      </div>
    </div>
  )
}
