"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ProjectsSlider component
// - Shows 3 cards: left, center (emphasized), right
// - Smooth slide using CSS transform: translateX() with 0.5s transition
// - Click left/right arrows to navigate
// - Continuous-feel: after transition ends, indices reset without visible jump
// - Responsive: cards scale to container; center card slightly larger with shadow
// - Videos come from an array of ProjectMedia objects
// - ONLY the center video plays (performance optimization)
// - Uses poster images as thumbnails for non-playing videos
// - Includes an optional inline demo at the bottom (exported Demo component)

export type ProjectMedia = {
  video: string;   // Path to video file
  poster: string;  // Path to poster/thumbnail image
  title?: string;  // Optional title for accessibility
};

export type ProjectsSliderProps = {
  images?: string[]; // Deprecated: kept for backward compatibility
  media?: ProjectMedia[]; // Preferred: video + poster image
  className?: string;
  // Duration of the slide transition in ms (default 500)
  durationMs?: number;
  // Scale applied to the center card (default 1.05)
  centerScale?: number;
  // Scale for immediate neighbors (default 0.9)
  neighborScale?: number;
  // Scale for far side cards (default 0.8)
  outerScale?: number;
  // Shadow strength for center card (default true)
  centerShadow?: boolean;
  // Optional: disable keyboard navigation
  disableKeyboard?: boolean;
  // Optional: explicit viewport height (px). If provided, overrides media rules.
  viewportHeight?: number;
  // Optional: CSS height value for viewport (e.g., '100vh', '80vh'). Takes precedence over viewportHeight.
  viewportHeightCss?: string;
  // Horizontal spacing between neighbor cards in pixels (default 24)
  spacingPx?: number;
  // Responsive height clamp value (e.g., 'clamp(280px, 50vw, 640px)') used when viewportHeight is not provided
  heightClamp?: string;
  // Portion of viewport height used for card size (0-1), default 0.8
  cardHeightRatio?: number;
  // Play video on hover instead of automatically (default false)
  playOnHover?: boolean;
  // Only play center video, pause others (default true for performance)
  playOnlyCenter?: boolean;
};

// Utility: modulo that handles negatives
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// Responsive button size calculation
const getButtonSize = () => {
  if (typeof window === 'undefined') return 40;
  return window.innerWidth < 640 ? 36 : 40;
};

const BUTTON_SIZE = 40;

export const ProjectsSlider: React.FC<ProjectsSliderProps> = ({
  images = [],
  media = [],
  className,
  durationMs = 500,
  centerScale = 1.05,
  neighborScale = 0.9,
  outerScale = 0.8,
  centerShadow = true,
  disableKeyboard = false,
  viewportHeight,
  viewportHeightCss,
  spacingPx = 24,
  heightClamp,
  cardHeightRatio = 0.8,
  playOnHover = false,
  playOnlyCenter = true,
}) => {
  // Convert legacy images array to media format for backward compatibility
  const normalizedMedia = useMemo(() => {
    if (media.length > 0) return media;
    return images.map((img) => ({ video: img, poster: '', title: '' }));
  }, [media, images]);

  const n = normalizedMedia.length;
  const [index, setIndex] = useState(0); // index of the center card
  const [shift, setShift] = useState(0); // -100, 0, or 100 during animation
  const [withTransition, setWithTransition] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isAnimatingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  // Ensure there are at least 2 videos to render the layout nicely
  const canSlide = n >= 2; // allow slide even with 2 videos (mirrors nicely)

  // Precompute the five neighboring indices for smooth wrapping
  const indices = useMemo(() => {
    if (n === 0) return [] as number[];
    // Order: left2(-200), left(-100), center(0), right(100), right2(200)
    return [mod(index - 2, n), mod(index - 1, n), mod(index, n), mod(index + 1, n), mod(index + 2, n)];
  }, [index, n]);

  // Handlers
  const goRight = useCallback(() => {
    if (!canSlide || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setWithTransition(true);
    setShift(-100); // move all left by one card width
  }, [canSlide]);

  const goLeft = useCallback(() => {
    if (!canSlide || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setWithTransition(true);
    setShift(100); // move all right by one card width
  }, [canSlide]);

  const onTransitionEnd = useCallback(() => {
    if (!isAnimatingRef.current) return;
    // After slide completes, update center index and reset without transition
    setWithTransition(false);
    setShift(0);
    setIndex((prev) => (shift === -100 ? mod(prev + 1, n) : mod(prev - 1, n)));
    // Allow next interactions on next tick to avoid mid-frame races
    requestAnimationFrame(() => {
      isAnimatingRef.current = false;
    });
  }, [n, shift]);

  // Video playback control: only play center video (or hovered video)
  useEffect(() => {
    if (!playOnlyCenter) return;

    const centerIndex = indices[2]; // The center card index

    videoRefs.current.forEach((video, videoIndex) => {
      if (!video) return;

      const shouldPlay = playOnHover
        ? hoveredIndex === videoIndex
        : videoIndex === centerIndex;

      if (shouldPlay) {
        video.play().catch((e) => {
          // Autoplay might be blocked by browser policy, that's ok
          console.debug('Video play failed:', e);
        });
      } else {
        video.pause();
        // Reset to start when not playing for cleaner transitions
        video.currentTime = 0;
      }
    });
  }, [index, indices, playOnlyCenter, playOnHover, hoveredIndex]);

  // Keyboard support when container is focused
  useEffect(() => {
    if (disableKeyboard) return;
    const el = containerRef.current;
    if (!el) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goRight();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goLeft();
      }
    };
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [goLeft, goRight, disableKeyboard]);

  if (n === 0) {
    return (
      <div className={className} style={{ padding: 16, textAlign: 'center' }}>
        No videos provided
      </div>
    );
  }

  // Card base positions in percentage of card width
  // We place five cards to guarantee continuity during animation
  const basePositions = [-200, -100, 0, 100, 200];

  // Styles
  const TRANSITION = `transform ${durationMs}ms ease`;

  // Derive a target card height from the viewport height if provided (no hooks needed)
  const derivedCardHeight = viewportHeight ? Math.round(viewportHeight * cardHeightRatio) : undefined;
  // If CSS height provided, compute height via CSS calc
  const derivedCardHeightCss = viewportHeightCss ? `calc(var(--ps-height) * ${cardHeightRatio})` : undefined;

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    // Height can be adapted; we use a responsive height via aspect-ish ratio
    // We'll set a min-height for small screens
    minHeight: 320,
    outline: 'none',
  };

  const defaultClamp = 'clamp(260px, 50vw, 640px)';
  const heightVar = viewportHeightCss || (viewportHeight ? `${viewportHeight}px` : (heightClamp || defaultClamp));

  const viewportStyles: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: 'var(--ps-height)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 0',
    ['--ps-height' as any]: heightVar,
  };

  // A wrapper that we slide in one go by changing `shift`
  const stageStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
  };

  const cardCommon: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // will be overridden per-card with translateX
    // Prefer height-driven sizing when viewportHeight is provided; otherwise responsive width
    height: derivedCardHeight ?? derivedCardHeightCss ?? undefined,
    width: (derivedCardHeight || derivedCardHeightCss) ? 'auto' : 'clamp(240px, 80vw, 56rem)',
    maxWidth: '95%',
    aspectRatio: '4 / 3',
    borderRadius: 16,
    overflow: 'hidden',
    background: '#111',
    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
  } as React.CSSProperties;

  const mediaStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    userSelect: 'none',
    pointerEvents: 'none',
  };

  const arrowBase: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: '9999px',
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
  } as React.CSSProperties;

  const leftArrowStyles: React.CSSProperties = {
    ...arrowBase,
    left: '4px',
  };
  const rightArrowStyles: React.CSSProperties = {
    ...arrowBase,
    right: '4px',
  };

  const renderCard = (slotIndex: number, mediaIndex: number) => {
    const base = basePositions[slotIndex]; // -200, -100, 0, 100, 200

    // Determine visual proximity to center based on current shift
    const position = base + shift; // -200, -100, 0, 100, 200 (plus during transition)
    let scale = outerScale;
    if (Math.abs(position) < 50) {
      scale = centerScale;
    } else if (Math.abs(position) < 150) {
      scale = neighborScale;
    }
    const isCenterish = Math.abs(position) < 50;
    const shadow = isCenterish && centerShadow ? '0 12px 30px rgba(0,0,0,0.35)' : '0 4px 14px rgba(0,0,0,0.15)';
    // Apply extra horizontal spacing based on the card's relative slot position
    const spacingFactor = (base + shift) / 100; // -2, -1, 0, 1, 2 during animation
    const extraPx = spacingFactor * spacingPx;
    const transform = `translate(calc(-50% + ${(base + shift)}% + ${extraPx}px), -50%) scale(${scale})`;

    // Detect if this is a left or right neighbor card (clickable)
    const isLeftCard = slotIndex === 1; // left neighbor
    const isRightCard = slotIndex === 3; // right neighbor
    const isClickable = isLeftCard || isRightCard;

    const style: React.CSSProperties = {
      ...cardCommon,
      transform,
      transition: withTransition ? TRANSITION : 'none',
      boxShadow: shadow,
      ['--card-x' as any]: `${(base + shift)}% + ${extraPx}px`,
      ['--card-scale' as any]: scale,
      cursor: isClickable ? 'pointer' : 'default',
    };

    const mediaItem = normalizedMedia[mediaIndex];
    const { video, poster, title } = mediaItem;

    // Click handler for side cards
    const handleCardClick = () => {
      if (!isClickable) return;
      if (isLeftCard) {
        goLeft();
      } else if (isRightCard) {
        goRight();
      }
    };

    // Keyboard handler for accessibility
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isClickable) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick();
      }
    };

    // Hover handlers for play-on-hover mode
    const handleMouseEnter = () => {
      if (playOnHover) {
        setHoveredIndex(mediaIndex);
      }
    };

    const handleMouseLeave = () => {
      if (playOnHover) {
        setHoveredIndex(null);
      }
    };

    return (
      <div
        key={`${slotIndex}-${mediaIndex}`}
        style={style}
        onTransitionEnd={slotIndex === 2 ? onTransitionEnd : undefined}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-ps-card
        aria-label={isClickable ? (isLeftCard ? 'View previous project' : 'View next project') : title || `Project ${mediaIndex + 1}`}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
      >
        <video
          ref={(el) => {
            if (el) {
              videoRefs.current.set(mediaIndex, el);
            } else {
              videoRefs.current.delete(mediaIndex);
            }
          }}
          src={video}
          poster={poster || undefined}
          style={mediaStyles}
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          draggable={false}
          aria-label={title || `Project ${mediaIndex + 1} video`}
        />
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyles}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Projects slider"
    >
      {/* Inline helper styles for responsiveness of container height */}
      <style>{`
        /* Default responsive height if CSS var is not set by inline style */
        [data-ps-viewport] { height: var(--ps-height, ${defaultClamp}); }

        /* Responsive arrow button sizing */
        @media (max-width: 639px) {
          [data-ps-arrow] {
            width: 36px;
            height: 36px;
          }
          [data-ps-arrow] svg {
            width: 18px;
            height: 18px;
          }
        }

        /* Hover emphasis on arrows */
        @media (hover: hover) {
          [data-ps-arrow]:hover { background: rgba(0,0,0,0.5); }
        }
        [data-ps-arrow]:active { transform: translateY(-50%) scale(0.96); }

        /* Smooth hover effect on project cards */
        [data-ps-card] {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.4s ease,
                      filter 0.4s ease;
          position: relative;
        }

        @media (hover: hover) {
          [data-ps-card]:hover {
            transform: translate(calc(-50% + var(--card-x, 0)), calc(-50% - 8px)) scale(var(--card-scale, 1)) !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,0.1);
            filter: brightness(1.1);
            z-index: 10;
          }
        }

        /* Video zoom effect on hover */
        [data-ps-card] video {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (hover: hover) {
          [data-ps-card]:hover video {
            transform: scale(1.08);
          }
        }

        /* Clickable cards get extra hover indication */
        [data-ps-card][role="button"] {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.3s ease,
                      filter 0.3s ease,
                      opacity 0.3s ease;
        }

        @media (hover: hover) {
          [data-ps-card][role="button"]:hover {
            opacity: 0.95;
            transform: translate(calc(-50% + var(--card-x, 0)), calc(-50% - 12px)) scale(calc(var(--card-scale, 1) * 1.02)) !important;
          }
        }

        /* Focus state for accessibility */
        [data-ps-card][role="button"]:focus {
          outline: 2px solid rgba(255,255,255,0.5);
          outline-offset: 4px;
        }
      `}</style>

      <button
        type="button"
        aria-label="Previous"
        onClick={goLeft}
        style={leftArrowStyles}
        data-ps-arrow
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div style={viewportStyles} data-ps-viewport>
        <div style={stageStyles}>
          {/* Render five positions for seamless slide */}
          {renderCard(0, indices[0])}
          {renderCard(1, indices[1])}
          {renderCard(2, indices[2])}
          {renderCard(3, indices[3])}
          {renderCard(4, indices[4])}
        </div>
      </div>

      <button
        type="button"
        aria-label="Next"
        onClick={goRight}
        style={rightArrowStyles}
        data-ps-arrow
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

// Demo usage: basic local component so you can try immediately
// You can remove this export if you will import ProjectsSlider elsewhere.
export const ProjectsSliderDemo: React.FC = () => {
  const demoImages = [
    'https://colorlib.com/wp/wp-content/uploads/sites/2/travelix-free-template.jpg',
    'https://cdn.dribbble.com/userupload/15260343/file/original-7d5dbddf18652e424ca1f4c0e1b68214.jpg?format=webp&resize=1200x900&vertical=center',
    'https://cdn.dribbble.com/userupload/15815660/file/original-fbc537de5d6ca9512a3f32429637d2bb.png?resize=400x300',
    'https://cdn.dribbble.com/users/4678459/screenshots/16123098/tourink.png',
    'https://cdn.dribbble.com/users/7927919/screenshots/18453761/dribbble_shot_hd_-_1_4x.jpg',
    
  ];

  return (
    <div style={{ padding: 24, background: '#0b0b0b', minHeight: '100vh', color: '#eaeaea'  }}>
      <h2 style={{ margin: '0 0 16px 0' }}>Projects Slider Demo</h2>
      <p style={{ margin: '0 0 24px 0', opacity: 0.75 }}>
        Use the arrows or keyboard (←/→) to navigate. The center card scales up with a soft shadow.
      </p>
      <ProjectsSlider images={demoImages} viewportHeight={600} />
    </div>
  );
};
