# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Pauerv** is a modern software development agency portfolio/landing page built with Next.js 15 App Router, TypeScript, and Tailwind CSS. The project emphasizes performance, accessibility (WCAG 2.1 AA), and sophisticated scroll-based animations using GSAP.

## Common Commands

### Development
```bash
npm run dev          # Start dev server at localhost:3000 with hot reload
npm run build        # Build production bundle (optimized)
npm start            # Start production server
npm run lint         # Run ESLint checks
npm run type-check   # Run TypeScript compiler without emitting files
```

### Development Workflow
- Run `npm run dev` for development with HMR
- Always run `npm run type-check` before committing
- Use `npm run lint` to catch code quality issues

## Architecture Overview

### Next.js App Router Structure

The project uses **App Router** (not Pages Router) with file-based routing:

- **Route Groups** (folders with parentheses): Organize routes without affecting URLs
  - `(marketing)/` - Public pages (about, etc.)
  - `(app)/` - Application pages (dashboard, settings)

- **Layouts**: `layout.tsx` files provide shared UI across nested routes
  - Root layout at `src/app/layout.tsx` handles fonts, metadata, global styles
  - Nested layouts like `src/app/(app)/dashboard/layout.tsx` wrap route segments

- **Pages**: `page.tsx` files define route endpoints
  - `src/app/page.tsx` → `/` (home/landing page)
  - `src/app/(marketing)/about/page.tsx` → `/about`

- **API Routes**: `src/app/api/**/route.ts` files export HTTP verb functions
  ```typescript
  export async function GET() { return NextResponse.json({...}) }
  export async function POST(request: Request) { /* ... */ }
  ```

### Component Architecture

**Server Components** (default):
- Render on server, no client-side JavaScript
- Cannot use hooks, event listeners, or browser APIs
- Example: `src/components/server/sidebar.tsx`

**Client Components** (marked with `'use client'`):
- Enable interactivity, state, and browser APIs
- Required for: animations, event handlers, hooks
- Examples: `navigation.tsx`, `scroll-hero.tsx`, `projects-slider.tsx`, `services-section.tsx`

**Component Organization**:
```
src/components/
├── landing/           # Landing page specific components
│   ├── navigation.tsx        # Sticky nav with scroll detection
│   ├── scroll-hero.tsx       # Hero with GSAP scroll animations
│   ├── projects-slider.tsx   # Custom carousel with keyboard nav
│   ├── services-section.tsx  # Async data fetching
│   ├── service-card.tsx      # Individual service cards
│   ├── about-section.tsx     # About with morphing shapes
│   └── tech-carousel.tsx     # Auto-scrolling tech stack
├── ui/                # Reusable UI components
└── server/            # Server-only components
```

### Data Layer Pattern

**Service-based architecture** in `src/services/`:
- `projectsService.ts` - Returns `Project[]` with id, title, description, image, link
- `servicesService.ts` - Returns `Service[]` with id, title, description, image, technologies, link

**Current State**: Hardcoded data with simulated 100ms delays
**Future Migration**: TODO comments indicate API integration path (e.g., `await fetch('/api/projects')`)

**Usage Pattern**:
```typescript
// In client component
const [data, setData] = useState<Service[]>([])
useEffect(() => {
  getServices().then(setData) // Service handles async logic
}, [])
```

### Animation Patterns

**GSAP with ScrollTrigger** (`scroll-hero.tsx`):
- Pin elements during scroll
- Parallax effects and reveal animations
- **Important**: Always check `prefers-reduced-motion` and disable animations if true
- Debounce resize handlers (250ms) to prevent excessive ScrollTrigger.refresh() calls

**Reduced Motion Support**:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReducedMotion) {
  gsap.set(elements, { opacity: 1, scale: 1, y: 0 })
  return // Skip animations
}
```

**Auto-scrolling Carousel** (`tech-carousel.tsx`):
- Respects reduced motion preferences
- Pauses on hover
- Uses CSS transforms for performance

## Key Technical Decisions

### TypeScript Configuration
- **Path Alias**: `@/*` maps to `./src/*`
  - Import as: `import { utils } from '@/lib/utils'`
- **Strict Mode**: Enabled
- **Target**: ES2017 with ESNext modules

### Image Optimization
- Configured in `next.config.js` with 8 device size breakpoints (640px-3840px)
- Supports WebP and AVIF formats
- **Always use blur placeholders**: Import from `@/lib/image-placeholders`
  ```typescript
  import { imagePlaceholders } from '@/lib/image-placeholders'

  <Image
    src="/images/example.jpg"
    placeholder="blur"
    blurDataURL={imagePlaceholders.gradient} // or .pink, .blue
    alt="Descriptive alt text"
  />
  ```

### Styling Patterns
- **Utility-first Tailwind CSS**: Prefer Tailwind classes over custom CSS
- **Responsive Design**: Mobile-first with breakpoints `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- **Custom CSS**: Only add to `globals.css` within `@layer base`, `@layer components`, or `@layer utilities`
- **Inline styles**: Used for dynamic/JS-driven values (e.g., GSAP animations, slider transforms)

### Accessibility Requirements
- All interactive elements need ARIA labels and focus states
- Minimum touch target: 44x44px
- Support keyboard navigation (Tab, Enter, Arrow keys)
- Use semantic HTML (`<nav>`, `<button>`, `<section>`)
- Always implement `prefers-reduced-motion` for animations
- Ensure screen reader compatibility with proper ARIA attributes

## Important Implementation Details

### Projects Slider (`projects-slider.tsx`)
Complex carousel component with specific patterns:
- Uses transform: translateX() with continuous index wrapping (modulo math)
- Renders 5 positions: left2, left1, center, right1, right2 for seamless infinite scroll
- **Props**: `neighborScale`, `outerScale`, `centerScale` control card scaling
- `viewportHeightCss` accepts CSS values like "50svh" for responsive height
- `spacingPx` controls horizontal spacing between cards
- Keyboard navigation with arrow keys (when focused)
- Touch-friendly with proper button sizing on mobile

### Hero Section (`scroll-hero.tsx`)
- GSAP timeline synced to scroll position
- Pin container during animation sequence
- Stagger reveals for text and images
- **Critical**: Debounced resize handler to prevent performance issues
- Cleanup: Always `ScrollTrigger.getAll().forEach(t => t.kill())` on unmount

### Navigation (`navigation.tsx`)
- Sticky positioning with scroll detection
- Mobile menu with hamburger animation
- Smooth scroll to sections with offset calculation
- Links to section IDs: `#projects`, `#services`, `#about`

### Services Section (`services-section.tsx`)
- Fetches data from service layer in `useEffect`
- Loading states and error handling
- Grid layout: 1 column mobile, 2 columns tablet, 3 columns desktop
- Each `ServiceCard` is a server component receiving props

## File Paths and Conventions

### Adding New Pages
Create `page.tsx` in desired route folder:
```
src/app/my-route/page.tsx → /my-route
src/app/(marketing)/pricing/page.tsx → /pricing
```

### Adding New API Endpoints
Create `route.ts` in `src/app/api/`:
```typescript
// src/app/api/projects/route.ts → /api/projects
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ projects: [] })
}
```

### Adding New Components
- **Client component** (interactive): Add to `src/components/ui/` or `src/components/landing/`
- **Server component** (static): Add to `src/components/server/`
- **Shared types**: Add to `src/types/index.ts`
- **Utilities**: Add to `src/lib/`

## Performance Considerations

### Image Loading
- All hero images use blur placeholders (reduces CLS by ~80%)
- Cache TTL: 24 hours configured in `next.config.js`
- Lazy loading automatic for off-screen images

### Event Handlers
- **Debounce resize listeners**: 250ms minimum (prevents ~70% CPU usage)
- **Throttle scroll listeners**: If adding new scroll effects
- Use `requestAnimationFrame` for smooth animations

### Build Optimization
- Code splitting automatic via Next.js
- Server components reduce client bundle size
- Dynamic imports available for heavy components:
  ```typescript
  const HeavyComponent = dynamic(() => import('@/components/heavy'), {
    loading: () => <p>Loading...</p>
  })
  ```

## SEO and Metadata

Root layout (`src/app/layout.tsx`) contains comprehensive metadata:
- Title template: `%s | Pauerv`
- Open Graph tags for social sharing
- Twitter Card configuration
- Keywords for search visibility

**Page-specific metadata**:
```typescript
// In page.tsx
export const metadata = {
  title: 'About Us', // Becomes "About Us | Pauerv"
  description: 'Page description'
}
```

## Known Patterns and Conventions

### State Management
- Local component state with `useState` (no global state library currently)
- Data fetching via service layer functions
- No Redux/Zustand - add only if complexity increases

### Error Handling
- Try-catch in async data fetching (see `services-section.tsx`)
- Console errors for development debugging
- Production: Consider error boundaries for client components

### Git Workflow
Current branch: `main`
- No feature branch workflow enforced
- Recent commits focus on: Services section, animations, navigation

## Integration Points

### Future Backend Integration
Services are abstracted for easy API swap:
```typescript
// Change from:
const hardcodedData = [...]
return hardcodedData

// To:
const response = await fetch('/api/projects')
return response.json()
```

### Analytics Setup Ready
Metadata supports Google Analytics/Tag Manager integration
Add tracking scripts in root layout

### CMS Integration
Replace service layer hardcoded data with CMS API calls
Maintain same interface definitions for seamless swap

## Deployment

**Optimized for Vercel**:
- Push to GitHub and import in Vercel dashboard
- Automatic deployments on push to main
- Environment variables set in Vercel dashboard

**Alternative platforms**:
```bash
npm run build
npm start  # Node.js server on port 3000
```

## Documentation References

- `README.md` - Setup instructions and architecture overview
- `IMPROVEMENTS.md` - Performance optimization changelog (7 major improvements documented)
- `package.json` - Dependencies and scripts
- [Next.js App Router Docs](https://nextjs.org/docs/app)
