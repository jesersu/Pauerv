'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { imagePlaceholders } from '@/lib/image-placeholders'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ScrollHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinWrapperRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return

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
      return
    }

    // Initial timeline for entrance animations (before scroll)
    const introTl = gsap.timeline()

    // Step 1: Show "SOFTWARE FOR YOU" text rows with stagger
    introTl.to([text1Row1, text1Row2, text1Row3], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    })

    // Step 2: After 2 seconds, show the two images
    .to([imageTop, imageBottom], {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(0.4)'
    }, '+=1') // Wait 2 seconds after previous animation

    // Scroll-triggered timeline
    const scrollTl = gsap.timeline({
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

    // Scroll Animation 1: Move images to center
    scrollTl.to(imageTop, {
      left: '35%',                     // Move to center horizontally
      top: '35%',                      // Position above center
      x: '-50%',                       // Center adjustment
      y: '-50%',                       // Center adjustment
      duration: 1,
      ease: 'power2.inOut'
    })
    .to(imageBottom, {
      left: '65%',                     // Move to center horizontally
      bottom: '35%',                   // Position below center
      x: '-50%',                       // Center adjustment
      y: '50%',                        // Center adjustment
      duration: 1,
      ease: 'power2.inOut'
    }, '<')                            // Start at same time as previous

    // Hide "SOFTWARE FOR YOU" text (scale down and fade slowly)
    .to([text1Row1, text1Row2, text1Row3], {
      scale: 0.5,
      opacity: 0,
      duration: 1.0,
      ease: 'power1.inOut'
    }, '<0.3')

    // Show "WE BUILD FOR YOU" text from alternating sides
    // Row 1: from left
    .to(text2Row1, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.3')

    // Row 2: from right
    .to(text2Row2, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')

    // Row 3: from left
    .to(text2Row3, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')

    // Debounced resize handler for better performance
    let resizeTimer: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 250)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      introTl.kill()
      scrollTl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
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
        {/* Initial Text: SOFTWARE FOR YOU */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-8">
          <div
            ref={text1Row1Ref}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white opacity-0"
            style={{ transform: 'translateY(50px)' }}
          >
            SOFTWARE
          </div>
          <div
            ref={text1Row2Ref}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white opacity-0"
            style={{ transform: 'translateY(50px)' }}
          >
            FOR
          </div>
          <div
            ref={text1Row3Ref}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white opacity-0"
            style={{ transform: 'translateY(50px)' }}
          >
            YOU
          </div>
        </div>

        {/* Images */}
        {/* Top Left Image */}
        <div
          ref={imageTopRef}
          className="absolute top-[-8%] left-[10%] w-64 sm:w-80 md:w-96 opacity-0"
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
            sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
            placeholder="blur"
            blurDataURL={imagePlaceholders.gradient}
          />
        </div>

        {/* Bottom Right Image */}
        <div
          ref={imageBottomRef}
          className="absolute bottom-[-5%] right-[10%] w-32 sm:w-40 md:w-80 opacity-0"
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
            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 320px"
            placeholder="blur"
            blurDataURL={imagePlaceholders.pink}
          />
        </div>

        {/* Final Text: WE BUILD FOR YOU */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 md:gap-6">
          <div
            ref={text2Row1Ref}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white opacity-0"
            style={{ transform: 'translateX(-200px)' }}
          >
            WE
          </div>
          <div
            ref={text2Row2Ref}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white opacity-0"
            style={{ transform: 'translateX(200px)' }}
          >
            BUILD
          </div>
          <div
            ref={text2Row3Ref}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white opacity-0"
            style={{ transform: 'translateX(-200px)' }}
          >
            FOR YOU
          </div>
        </div>
      </div>
    </div>
  )
}
