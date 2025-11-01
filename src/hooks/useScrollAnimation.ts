/**
 * Hook for scroll-triggered animations with automatic cleanup
 *
 * Automatically respects reduced motion preference and handles GSAP cleanup.
 *
 * Usage:
 * const ref = useRef<HTMLElement>(null)
 * useScrollAnimation(
 *   ref,
 *   AnimationFactory.fadeInFromTop({ scrollTrigger: { trigger: ref.current } })
 * )
 */

import { useEffect, RefObject, DependencyList } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'
import type { AnimationParams } from '@/lib/animations/factory'

export function useScrollAnimation(
  ref: RefObject<Element>,
  animation: AnimationParams,
  deps: DependencyList = []
) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Capture ref.current in effect scope for cleanup
    const element = ref.current

    // Skip if user prefers reduced motion
    if (prefersReducedMotion) {
      // Set final state immediately without animation
      if (element) {
        gsap.set(element, { opacity: 1, y: 0, x: 0, scale: 1 })
      }
      return
    }

    // Skip if element doesn't exist
    if (!element) return

    // Create animation
    const anim = gsap.fromTo(element, animation.from, animation.to)

    // Cleanup function
    return () => {
      // Kill the animation
      anim.kill()

      // Kill associated ScrollTriggers
      ScrollTrigger.getAll()
        .filter(trigger => trigger.vars.trigger === element)
        .forEach(trigger => trigger.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, prefersReducedMotion])
}
