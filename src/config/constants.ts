/**
 * Application-wide configuration constants
 *
 * This file provides a single source of truth for all magic numbers,
 * animation timings, z-index values, and other configuration values
 * used throughout the application.
 *
 * Benefits:
 * - Easy to maintain consistency
 * - Self-documenting code
 * - Simple to adjust values globally
 * - Type-safe with TypeScript
 * - Better IDE autocomplete
 */

/**
 * Layout constants for consistent spacing and sizing
 */
export const LAYOUT = {
  NAVBAR: {
    HEIGHT_DESKTOP: 80,  // Corresponds to Tailwind md:h-20
    HEIGHT_MOBILE: 64,   // Corresponds to Tailwind h-16
    SCROLL_OFFSET: 20,   // Extra padding when scrolling to sections
  },
  BREAKPOINTS: {
    SM: 640,   // Mobile landscape
    MD: 768,   // Tablet portrait
    LG: 1024,  // Tablet landscape / Small desktop
    XL: 1280,  // Desktop
    '2XL': 1536, // Large desktop
  },
  SPACING: {
    SECTION_PADDING_Y: {
      MOBILE: 64,   // 4rem
      TABLET: 96,   // 6rem
      DESKTOP: 128, // 8rem
    }
  }
} as const

/**
 * Animation timing and easing configurations
 * Use these to maintain consistent animation feel across the app
 */
export const ANIMATION = {
  DURATION: {
    INSTANT: 0,
    FAST: 0.3,      // Quick interactions (hover, focus)
    NORMAL: 0.8,    // Standard animations
    SLOW: 1.2,      // Emphasis animations
    VERY_SLOW: 2,   // Hero/showcase animations
  },
  EASING: {
    // Standard easings
    SMOOTH: 'power2.out',
    SMOOTH_IN: 'power2.in',
    SMOOTH_IN_OUT: 'power2.inOut',

    // Emphasis easings
    STRONG: 'power3.out',
    STRONG_IN: 'power3.in',
    STRONG_IN_OUT: 'power3.inOut',

    // Playful easings
    ELASTIC: 'elastic.out(1, 0.3)',
    BOUNCE: 'back.out(1.7)',
  },
  STAGGER: {
    TIGHT: 0.1,    // Rapid succession
    NORMAL: 0.2,   // Standard stagger
    LOOSE: 0.3,    // Spaced out reveals
    VERY_LOOSE: 0.5, // Dramatic reveals
  },
  SCROLL_TRIGGER: {
    // When to start animations relative to viewport
    START_VERY_EARLY: 'top 95%',  // Almost immediately
    START_EARLY: 'top 90%',       // A bit early
    START_DEFAULT: 'top 80%',     // Standard (element 80% in view)
    START_LATE: 'top 70%',        // Wait until more visible
    START_VERY_LATE: 'top 50%',   // Center of viewport

    // Toggle actions: onEnter, onLeave, onEnterBack, onLeaveBack
    PLAY_ONCE: 'play none none none',
    PLAY_REVERSE: 'play none none reverse',
    PLAY_ALWAYS: 'play reverse play reverse',
  }
} as const

/**
 * Z-index layering system
 *
 * Use these values to maintain consistent stacking contexts.
 * Never use arbitrary numbers like z-[9999] or z-[1000].
 *
 * When you need a higher layer, add it to this scale and document it.
 */
export const Z_INDEX = {
  // Base layers (0-10)
  BASE: 0,                // Normal document flow
  DECORATIVE: 10,         // Background decorations, images

  // Interactive layers (20-40)
  INTERACTIVE: 20,        // Buttons, cards with hover effects
  DROPDOWN: 30,           // Dropdown menus, selects
  TOOLTIP: 35,            // Tooltips, popovers
  SIDEBAR: 40,            // Slide-out menus, drawers

  // Overlay layers (50-100)
  NAVIGATION: 50,         // Fixed navbar, headers
  MODAL_BACKDROP: 60,     // Modal backdrop overlay
  MODAL: 70,              // Modal dialogs
  TOAST: 100,             // Toast notifications (always on top)
} as const

/**
 * API and network configuration
 */
export const API = {
  TIMEOUT: 10000,         // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,      // 1 second
  RATE_LIMIT: {
    CONTACT_FORM: {
      MAX_REQUESTS: 5,
      WINDOW_MS: 60 * 60 * 1000, // 1 hour
    }
  }
} as const

/**
 * Form validation limits
 */
export const VALIDATION = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  EMAIL: {
    MAX_LENGTH: 255,
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  SUBJECT: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 200,
  },
  MESSAGE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 5000,
  }
} as const

/**
 * Slider/Carousel configuration
 */
export const SLIDER = {
  PROJECTS: {
    VIEWPORT_HEIGHT: '50svh',
    CARD_HEIGHT_RATIO: 0.72,
    SPACING: 48,
    SCALES: {
      CENTER: 1,
      NEIGHBOR: 0.85,
      OUTER: 0.7,
    }
  }
} as const

// Type helpers for better autocomplete and type safety
export type AnimationDuration = typeof ANIMATION.DURATION[keyof typeof ANIMATION.DURATION]
export type AnimationEasing = typeof ANIMATION.EASING[keyof typeof ANIMATION.EASING]
export type ZIndex = typeof Z_INDEX[keyof typeof Z_INDEX]
export type Breakpoint = typeof LAYOUT.BREAKPOINTS[keyof typeof LAYOUT.BREAKPOINTS]
