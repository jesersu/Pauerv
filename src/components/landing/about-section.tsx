"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // useGSAP provides automatic cleanup and better React integration
  useGSAP(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show content immediately without animation
      gsap.set(content, { y: 0, opacity: 1 });
      gsap.set(content.querySelectorAll('[data-speed]'), { opacity: 1, y: 0 });
      return;
    }

    // Animate the entire content area moving up as you scroll down
    gsap.fromTo(
      content,
      {
        y: 1000,
        opacity: 0,
      },
      {
        y: -1000,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 5,
          invalidateOnRefresh: true,
        },
      }
    );

    // Get all elements with data-speed attribute
    const speedElements = content.querySelectorAll('[data-speed]');

    // Create scroll-based parallax effect for each element
    speedElements.forEach((element) => {
      const speed = element.getAttribute('data-speed');

      if (!speed) return;

      // Parse speed value (handle "clamp()" syntax)
      let speedValue = 1;
      if (speed.includes('clamp')) {
        const match = speed.match(/clamp\(([\d.]+)\)/);
        speedValue = match ? parseFloat(match[1]) : 1;
      } else {
        speedValue = parseFloat(speed);
      }

      // Calculate movement range based on speed (relative to container movement)
      const moveAmount = (speedValue - 1) * 300;

      gsap.to(element, {
        y: moveAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Fade in on entrance with stagger
      gsap.from(element, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Cleanup: useGSAP automatically reverts all animations created within this context
  }, { scope: sectionRef }); // Scope ensures animations are contained to this component

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-32">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            About Us
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            We transform ideas into exceptional digital experiences through innovation and creativity
          </p>
        </div>

        {/* Parallax Content Area */}
        <div
          className="relative flex items-center justify-center"
        >
          {/* Image Group with parallax speeds */}
          <div className="flex items-center justify-around gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl px-4">
            {/* Element 1 - Speed: clamp(1.25) */}
            <div
              data-speed="clamp(1.25)"
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50 flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-purple-300 text-xs sm:text-sm font-mono whitespace-nowrap">
                Fast
              </div>
            </div>

            {/* Element 2 - Speed: 0.8 */}
            <div
              data-speed="0.8"
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/50 flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-blue-300 text-xs sm:text-sm font-mono whitespace-nowrap">
                Smart
              </div>
            </div>

            {/* Element 3 - Speed: 1.0 */}
            <div
              data-speed="1"
              className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50 flex items-center justify-center">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-green-300 text-xs sm:text-sm font-mono whitespace-nowrap">
                Creative
              </div>
            </div>

            {/* Element 4 - Speed: 1.2 */}
            <div
              data-speed="1.2"
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/50 flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-orange-300 text-xs sm:text-sm font-mono whitespace-nowrap">
                Bold
              </div>
            </div>

            {/* Element 5 - Speed: clamp(0.9) */}
            <div
              data-speed="clamp(0.9)"
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/50 flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-pink-300 text-xs sm:text-sm font-mono whitespace-nowrap">
                Passion
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          ref={contentRef}>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
              150+
            </div>
            <div className="text-gray-400 text-sm sm:text-base">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 mb-2">
              50+
            </div>
            <div className="text-gray-400 text-sm sm:text-base">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">
              10+
            </div>
            <div className="text-gray-400 text-sm sm:text-base">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-2">
              24/7
            </div>
            <div className="text-gray-400 text-sm sm:text-base">Support Available</div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-32 max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Our Mission
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            We believe in the power of technology to transform businesses and create meaningful impact.
            Our team of passionate developers, designers, and innovators work together to deliver
            cutting-edge solutions that drive success and exceed expectations.
          </p>
        </div>
      </div>
    </section>
  );
}
