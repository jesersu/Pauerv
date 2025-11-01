/**
 * Hook for staggered animations on multiple elements
 *
 * Animates children of a container with a stagger effect.
 * Automatically respects reduced motion preference.
 *
 * Usage:
 * const containerRef = useRef<HTMLDivElement>(null)
 * useStaggerAnimation(
 *   containerRef,
 *   AnimationFactory.staggerCards({ scrollTrigger: { trigger: containerRef.current } })
 * )
 */

import { useEffect, RefObject, DependencyList } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'
import type { AnimationParams } from '@/lib/animations/factory'

export function useStaggerAnimation(
  containerRef: RefObject<Element>,
  animation: AnimationParams,
  deps: DependencyList = []
) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children)

    // Skip if user prefers reduced motion
    if (prefersReducedMotion) {
      // Set final state immediately without animation
      gsap.set(children, { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }

    // Create staggered animation
    const anim = gsap.fromTo(children, animation.from, animation.to)

    // Cleanup function
    return () => {
      // Kill the animation
      anim.kill()

      // Kill associated ScrollTriggers
      ScrollTrigger.getAll()
        .filter(trigger => children.includes(trigger.vars.trigger as Element))
        .forEach(trigger => trigger.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, prefersReducedMotion])
}
