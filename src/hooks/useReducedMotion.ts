/**
 * Hook to detect if user prefers reduced motion
 *
 * Respects system accessibility settings for users who are sensitive to motion.
 * Should be used before applying any animations.
 *
 * Usage:
 * const prefersReducedMotion = useReducedMotion()
 * if (prefersReducedMotion) {
 *   // Skip animations
 *   return
 * }
 */

import { useMemo } from 'react'

export function useReducedMotion(): boolean {
  return useMemo(() => {
    // Server-side rendering check
    if (typeof window === 'undefined') return false

    // Check user's system preference
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
}
