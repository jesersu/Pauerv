/**
 * ProjectsSlider Style Configuration
 *
 * Centralized style objects and constants for the ProjectsSlider component.
 * Keeps the main component clean and focused on logic.
 */

import type React from 'react';

// ============================================================================
// CONSTANTS
// ============================================================================

export const BUTTON_SIZE = 40;
export const DEFAULT_CLAMP = 'clamp(260px, 50vw, 640px)';
export const CARD_BORDER_RADIUS = 16;
export const ARROW_BORDER_RADIUS = '9999px';

// ============================================================================
// STYLE CREATORS (functions that generate styles based on props)
// ============================================================================

/**
 * Creates container styles
 */
export const createContainerStyles = (): React.CSSProperties => ({
  position: 'relative',
  width: '100%',
  minHeight: 320,
  outline: 'none',
});

/**
 * Creates viewport styles with dynamic height variable
 */
export const createViewportStyles = (heightVar: string): React.CSSProperties => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: 'var(--ps-height)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 0',
  ['--ps-height' as any]: heightVar,
});

/**
 * Creates stage (wrapper that slides) styles
 */
export const createStageStyles = (): React.CSSProperties => ({
  position: 'relative',
  width: '100%',
  height: '100%',
});

/**
 * Creates common card styles (baseline for all cards)
 */
export const createCardCommonStyles = (
  derivedCardHeight?: number | string,
  derivedCardHeightCss?: string
): React.CSSProperties => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: derivedCardHeight ?? derivedCardHeightCss ?? undefined,
  width: (derivedCardHeight || derivedCardHeightCss) ? 'auto' : 'clamp(240px, 80vw, 56rem)',
  maxWidth: '95%',
  aspectRatio: '4 / 3',
  borderRadius: CARD_BORDER_RADIUS,
  overflow: 'hidden',
  background: '#111',
  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
});

/**
 * Creates video media styles
 */
export const createMediaStyles = (): React.CSSProperties => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  userSelect: 'none',
  pointerEvents: 'none',
});

/**
 * Creates base arrow button styles
 */
export const createArrowBaseStyles = (): React.CSSProperties => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  borderRadius: ARROW_BORDER_RADIUS,
  border: '1px solid rgba(255,255,255,0.25)',
  background: 'rgba(0,0,0,0.35)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 20,
  backdropFilter: 'blur(2px)',
  WebkitBackdropFilter: 'blur(2px)',
});

/**
 * Creates left arrow styles
 */
export const createLeftArrowStyles = (): React.CSSProperties => ({
  ...createArrowBaseStyles(),
  left: '4px',
});

/**
 * Creates right arrow styles
 */
export const createRightArrowStyles = (): React.CSSProperties => ({
  ...createArrowBaseStyles(),
  right: '4px',
});

/**
 * Creates card-specific styles based on position
 */
export const createCardStyles = (
  cardCommon: React.CSSProperties,
  transform: string,
  transition: string,
  shadow: string,
  isClickable: boolean,
  position: number,
  spacingFactor: number
): React.CSSProperties => ({
  ...cardCommon,
  transform,
  transition: transition ? transition : 'none',
  boxShadow: shadow,
  ['--card-x' as any]: `${position}%`,
  ['--card-scale' as any]: 1,
  cursor: isClickable ? 'pointer' : 'default',
});

/**
 * Creates "Visit Site" button styles
 */
export const createVisitSiteButtonStyles = (): React.CSSProperties => ({
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  zIndex: 10,
  padding: '12px 24px',
  background: 'linear-gradient(135deg, #d47575 0%, #b85c5c 50%, #9e4646 100%)',
  backgroundSize: '300% 300%',
  backgroundPosition: '0% 50%',
  color: '#ffffff',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  perspective: '1200px',
  transformStyle: 'preserve-3d',
  boxShadow:
    '0 2px 4px rgba(0, 0, 0, 0.1), ' +
    '0 8px 16px rgba(0, 0, 0, 0.2), ' +
    'inset 1px 1px 2px rgba(255, 255, 255, 0.2), ' +
    'inset -1px -1px 2px rgba(0, 0, 0, 0.3)',
});

/**
 * Creates the transition string for card animations
 */
export const createTransition = (durationMs: number): string => {
  return `transform ${durationMs}ms ease`;
};

/**
 * Calculates the height variable for viewport
 */
export const calculateHeightVar = (
  viewportHeightCss?: string,
  viewportHeight?: number,
  heightClamp?: string
): string => {
  return viewportHeightCss || (viewportHeight ? `${viewportHeight}px` : (heightClamp || DEFAULT_CLAMP));
};
