/**
 * Animation Factory
 *
 * Provides reusable animation configurations for GSAP
 * Reduces code duplication and maintains consistent animation feel
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ANIMATION } from '@/config/constants'

export interface AnimationConfig {
  duration?: number
  ease?: string
  scrollTrigger?: ScrollTrigger.Vars
  stagger?: number
}

export interface AnimationParams {
  from: gsap.TweenVars
  to: gsap.TweenVars
}

/**
 * Animation Factory - Provides common animation patterns
 *
 * Usage:
 * const anim = AnimationFactory.fadeInFromTop(element)
 * gsap.fromTo(element, anim.from, anim.to)
 */
export const AnimationFactory = {
  /**
   * Fade in from top with optional scroll trigger
   */
  fadeInFromTop(config: AnimationConfig = {}): AnimationParams {
    const {
      duration = ANIMATION.DURATION.NORMAL,
      ease = ANIMATION.EASING.STRONG,
      scrollTrigger = {},
      stagger = 0
    } = config

    return {
      from: { y: -50, opacity: 0 },
      to: {
        y: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        scrollTrigger: scrollTrigger.trigger ? {
          start: ANIMATION.SCROLL_TRIGGER.START_DEFAULT,
          toggleActions: ANIMATION.SCROLL_TRIGGER.PLAY_REVERSE,
          ...scrollTrigger,
        } : undefined,
      }
    }
  },

  /**
   * Fade in from bottom with optional scroll trigger
   */
  fadeInFromBottom(config: AnimationConfig = {}): AnimationParams {
    const {
      duration = ANIMATION.DURATION.NORMAL,
      ease = ANIMATION.EASING.STRONG,
      scrollTrigger = {},
      stagger = 0
    } = config

    return {
      from: { y: 50, opacity: 0 },
      to: {
        y: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        scrollTrigger: scrollTrigger.trigger ? {
          start: ANIMATION.SCROLL_TRIGGER.START_DEFAULT,
          toggleActions: ANIMATION.SCROLL_TRIGGER.PLAY_REVERSE,
          ...scrollTrigger,
        } : undefined,
      }
    }
  },

  /**
   * Fade in from left
   */
  fadeInFromLeft(config: AnimationConfig = {}): AnimationParams {
    const {
      duration = ANIMATION.DURATION.NORMAL,
      ease = ANIMATION.EASING.STRONG,
      scrollTrigger = {},
      stagger = 0
    } = config

    return {
      from: { x: -100, opacity: 0 },
      to: {
        x: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        scrollTrigger: scrollTrigger.trigger ? {
          start: ANIMATION.SCROLL_TRIGGER.START_DEFAULT,
          toggleActions: ANIMATION.SCROLL_TRIGGER.PLAY_REVERSE,
          ...scrollTrigger,
        } : undefined,
      }
    }
  },

  /**
   * Fade in from right
   */
  fadeInFromRight(config: AnimationConfig = {}): AnimationParams {
    const {
      duration = ANIMATION.DURATION.NORMAL,
      ease = ANIMATION.EASING.STRONG,
      scrollTrigger = {},
      stagger = 0
    } = config

    return {
      from: { x: 100, opacity: 0 },
      to: {
        x: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        scrollTrigger: scrollTrigger.trigger ? {
          start: ANIMATION.SCROLL_TRIGGER.START_DEFAULT,
          toggleActions: ANIMATION.SCROLL_TRIGGER.PLAY_REVERSE,
          ...scrollTrigger,
        } : undefined,
      }
    }
  },

  /**
   * Scale in with bounce effect
   */
  scaleIn(config: AnimationConfig = {}): AnimationParams {
    const {
      duration = ANIMATION.DURATION.NORMAL,
      ease = ANIMATION.EASING.BOUNCE,
      scrollTrigger = {},
      stagger = 0
    } = config

    return {
      from: { scale: 0.8, opacity: 0 },
      to: {
        scale: 1,
        opacity: 1,
        duration,
        ease,
        stagger,
        scrollTrigger: scrollTrigger.trigger ? {
          start: ANIMATION.SCROLL_TRIGGER.START_DEFAULT,
          toggleActions: ANIMATION.SCROLL_TRIGGER.PLAY_REVERSE,
          ...scrollTrigger,
        } : undefined,
      }
    }
  },

  /**
   * Stagger animation for multiple elements (cards, list items)
   */
  staggerCards(config: AnimationConfig = {}): AnimationParams {
    const {
      duration = ANIMATION.DURATION.NORMAL,
      ease = ANIMATION.EASING.STRONG,
      scrollTrigger = {},
      stagger = ANIMATION.STAGGER.NORMAL,
    } = config

    return {
      from: { y: 100, opacity: 0, scale: 0.9 },
      to: {
        y: 0,
        opacity: 1,
        scale: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: scrollTrigger.trigger ? {
          start: 'top 85%',
          toggleActions: ANIMATION.SCROLL_TRIGGER.PLAY_REVERSE,
          ...scrollTrigger,
        } : undefined,
      }
    }
  },

  /**
   * Simple fade in
   */
  fadeIn(config: AnimationConfig = {}): AnimationParams {
    const {
      duration = ANIMATION.DURATION.NORMAL,
      ease = ANIMATION.EASING.SMOOTH,
      scrollTrigger = {},
    } = config

    return {
      from: { opacity: 0 },
      to: {
        opacity: 1,
        duration,
        ease,
        scrollTrigger: scrollTrigger.trigger ? {
          start: ANIMATION.SCROLL_TRIGGER.START_DEFAULT,
          toggleActions: ANIMATION.SCROLL_TRIGGER.PLAY_REVERSE,
          ...scrollTrigger,
        } : undefined,
      }
    }
  },

  /**
   * Reveal animation (scale + fade)
   */
  reveal(config: AnimationConfig = {}): AnimationParams {
    const {
      duration = ANIMATION.DURATION.SLOW,
      ease = ANIMATION.EASING.STRONG,
      scrollTrigger = {},
      stagger = 0
    } = config

    return {
      from: { scale: 0.95, y: 40, opacity: 0 },
      to: {
        scale: 1,
        y: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        scrollTrigger: scrollTrigger.trigger ? {
          start: ANIMATION.SCROLL_TRIGGER.START_DEFAULT,
          toggleActions: ANIMATION.SCROLL_TRIGGER.PLAY_REVERSE,
          ...scrollTrigger,
        } : undefined,
      }
    }
  },
}
