"use client";

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ProjectsSlider } from './ProjectsSlider';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProjectsSection() {
  const t = useTranslations('projects');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // useGSAP provides automatic cleanup and better React integration
  useGSAP(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const slider = sliderRef.current;

    if (!section || !title || !subtitle || !slider) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show content immediately without animation
      gsap.set([title, subtitle, slider], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Create timeline for entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    // Animate title from above with fade
    tl.from(title, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: 'power2.out',
    })

    // Animate subtitle from below with fade
    .from(subtitle, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.4') // Overlap with title animation

    // Animate slider with scale and fade
    .from(slider, {
      opacity: 0,
      scale: 0.95,
      y: 40,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.3'); // Overlap with subtitle

    // Cleanup: useGSAP automatically reverts animations
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="scroll-offset min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
    >
      <div className="max-w-7xl w-full">
        <div className="text-center">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3"
          >
            {t('title')}
          </h2>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto px-4"
          >
            {t('subtitle')}
          </p>
        </div>

        <div ref={sliderRef}>
          <ProjectsSlider
            media={[
              {
                video: '/videos/project1.mp4',
                poster: '/images/project/project-1-poster.png',
                title: t('project1'),
              },
              {
                video: '/videos/project2.mp4',
                poster: '/images/project/project-2-poster.jpg',
                title: t('project2'),
              },
              {
                video: '/videos/project3.mp4',
                poster: '/images/project/project-3-poster.jpg',
                title: t('project3'),
              },
              {
                video: '/videos/project4.mp4',
                poster: '/images/project/project-4-poster.jpg',
                title: t('project4'),
              },
              {
                video: '/videos/project5.mp4',
                poster: '/images/project/project-5-poster.jpg',
                title: t('project5'),
              },
            ]}
            viewportHeightCss="50svh"
            cardHeightRatio={0.72}
            spacingPx={48}
            neighborScale={0.85}
            outerScale={0.7}
            playOnlyCenter={true}
            playOnHover={false}
          />
        </div>
      </div>
    </section>
  );
}
