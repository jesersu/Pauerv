# Pauerv

A modern software development agency portfolio built with Next.js 15, featuring multi-language support, sophisticated scroll animations, and a fully responsive design.

## 🌟 Features

- **Multi-language Support** - English and Spanish with next-intl
- **Advanced Animations** - GSAP-powered scroll animations and transitions
- **Fully Responsive** - Mobile-first design with optimized layouts
- **Type-Safe** - Full TypeScript implementation
- **SEO Optimized** - Meta tags, Open Graph, and sitemap support
- **Accessibility** - WCAG 2.1 AA compliant with reduced motion support
- **Contact Form** - Integrated email functionality with Resend API
- **PWA Ready** - Progressive Web App manifest included

## 🛠 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Internationalization for Next.js
- **GSAP** - Professional-grade animations
- **Resend** - Modern email API for contact forms
- **ESLint** - Code linting and quality checks

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/jesersu/Pauerv.git
cd pauerv

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Add your Resend API key to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=your_resend_api_key_here
```

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm run type-check` - Run TypeScript compiler without emitting files

## 📁 Project Structure

```
pauerv/
├── messages/                   # Translation files
│   ├── en.json                # English translations
│   └── es.json                # Spanish translations
├── public/                     # Static assets
│   ├── images/                # Image files
│   ├── videos/                # Video files
│   └── site.webmanifest       # PWA manifest
├── src/
│   ├── app/
│   │   ├── [locale]/          # Locale-based routing
│   │   │   ├── (app)/         # App route group
│   │   │   │   └── dashboard/ # Dashboard pages
│   │   │   ├── (marketing)/   # Marketing route group
│   │   │   │   └── about/     # About page
│   │   │   ├── layout.tsx     # Locale layout with translations
│   │   │   └── page.tsx       # Home/landing page
│   │   ├── api/               # API routes
│   │   │   └── send-email/    # Contact form API
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── landing/           # Landing page components
│   │   │   ├── ScrollHero.tsx         # Hero with scroll animations
│   │   │   ├── ProjectsSection.tsx    # Projects showcase
│   │   │   ├── ProjectsSlider.tsx     # Custom carousel
│   │   │   ├── ServicesSection.tsx    # Services display
│   │   │   ├── ContactSection.tsx     # Contact form
│   │   │   └── ...
│   │   ├── layout/            # Layout components
│   │   │   ├── Navigation.tsx # Sticky navigation
│   │   │   └── Footer.tsx     # Footer
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── LanguageSwitcher.tsx # Language dropdown
│   │   │   └── ...
│   │   ├── server/            # Server-only components
│   │   └── ErrorBoundary.tsx  # Error boundary
│   ├── config/
│   │   └── constants.ts       # App constants (z-index, layout)
│   ├── hooks/                 # Custom React hooks
│   │   ├── useReducedMotion.ts
│   │   ├── useScrollAnimation.ts
│   │   └── useStaggerAnimation.ts
│   ├── i18n/                  # Internationalization config
│   │   ├── routing.ts         # i18n routing
│   │   └── request.ts         # Server-side i18n
│   ├── lib/                   # Utility functions
│   │   ├── animations/        # GSAP animation utilities
│   │   ├── image-placeholders.ts
│   │   └── rate-limit.ts
│   ├── services/              # Data layer
│   │   ├── servicesService.ts
│   │   └── projectsService.ts
│   ├── types/                 # TypeScript types
│   └── middleware.ts          # Next.js middleware for i18n
├── .env.local                  # Environment variables (create this)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🏗 Architecture Overview

### Multi-language Support

The application uses **next-intl** for internationalization:

- **Supported Languages**: English (en), Spanish (es)
- **Routing**: `/en/*` and `/es/*` URL patterns
- **Translations**: Stored in `messages/en.json` and `messages/es.json`
- **Middleware**: Automatic locale detection and redirection
- **Dynamic Data**: Service layer supports locale-based content

### Route Groups

Route groups organize routes without affecting URL structure:

- `[locale]/` - Locale-based routing (`/en`, `/es`)
- `(marketing)/` - Marketing pages (about)
- `(app)/` - Application pages (dashboard, settings)

### Server vs Client Components

**Server Components** (default):
- Render on the server
- Can fetch data directly
- Keep sensitive logic secure
- Examples: `Sidebar.tsx`, `ServiceCard.tsx`

**Client Components** (marked with `'use client'`):
- Enable interactivity and state
- Use React hooks and browser APIs
- Handle animations and user interactions
- Examples: `Navigation.tsx`, `ScrollHero.tsx`, `LanguageSwitcher.tsx`

### Animation Architecture

The project uses **GSAP** with React integration:

- **useGSAP Hook**: Automatic cleanup and scoping
- **ScrollTrigger**: Pin and reveal animations on scroll
- **Reduced Motion**: Respects user accessibility preferences
- **Performance**: Debounced resize handlers and optimized timelines

## 🎨 Key Components

### ScrollHero
Complex scroll-driven hero section with:
- Scroll-synced animations
- Dynamic background transitions
- Responsive layouts (desktop/mobile)
- Multi-language support

### ProjectsSlider
Custom infinite carousel with:
- Touch/mouse drag support
- Keyboard navigation
- Smooth scaling transitions
- Auto-play video on center card

### LanguageSwitcher
Dropdown language selector with:
- Flag icons for each language
- Click-outside detection
- Smooth animations
- Accessible ARIA labels

### ContactSection
Contact form with:
- Form validation
- Email integration via Resend API
- Loading and success states
- Rate limiting protection

## 🌐 Adding a New Language

1. Create translation file in `messages/` (e.g., `fr.json`)
2. Add locale to `src/i18n/routing.ts`:
```typescript
export const locales = ['en', 'es', 'fr'] as const
```
3. Add language to `LanguageSwitcher.tsx`:
```typescript
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]
```
4. Update `src/middleware.ts` if needed

## 📝 Development Guidelines

### Using Translations

```tsx
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('namespace')
  return <h1>{t('title')}</h1>
}
```

### Creating Animated Components

```tsx
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function AnimatedSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Create animations
    gsap.to('.element', {
      scrollTrigger: { trigger: sectionRef.current },
      opacity: 1
    })
  }, { scope: sectionRef })

  return <section ref={sectionRef}>...</section>
}
```

### Adding API Endpoints

```typescript
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  // Handle request
  return NextResponse.json({ success: true })
}
```

## 🎯 SEO and Performance

- **Metadata**: Comprehensive meta tags in all layouts
- **Image Optimization**: Next.js Image component with blur placeholders
- **Code Splitting**: Automatic via Next.js App Router
- **Static Generation**: Pre-rendered pages for both locales
- **Accessibility**: WCAG 2.1 AA compliant

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables (RESEND_API_KEY)
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

Server runs on port 3000 by default.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Resend Documentation](https://resend.com/docs)

## 📄 License

This project is private and proprietary.

## 👥 Authors

- **Pauerv Team** - [GitHub](https://github.com/jesersu/Pauerv)

---

Built with ❤️ using Next.js and modern web technologies.
