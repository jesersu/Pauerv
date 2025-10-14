# Pauerv

A modern Next.js application built with App Router architecture, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and quality checks

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler checks

## Project Structure

```
pauerv/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/       # Route group for marketing pages
│   │   │   └── about/         # About page
│   │   ├── (app)/             # Route group for app pages
│   │   │   └── dashboard/     # Dashboard with layout
│   │   │       └── settings/  # Settings page
│   │   ├── api/               # API routes
│   │   │   └── hello/         # Example API endpoint
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Client components (interactive)
│   │   │   └── counter.tsx
│   │   └── server/            # Server components
│   │       └── sidebar.tsx
│   ├── lib/                   # Utility functions
│   │   └── utils.ts
│   └── types/                 # TypeScript type definitions
│       └── index.ts
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Architecture Overview

This project follows **App Router architecture** with these key concepts:

### Route Groups

Route groups organize routes without affecting the URL structure:
- `(marketing)/` - Marketing pages (home, about)
- `(app)/` - Application pages (dashboard, settings)

### Server vs Client Components

**Server Components** (default):
- Render on the server
- Can fetch data directly
- Keep sensitive logic secure
- Examples: `src/components/server/sidebar.tsx`

**Client Components** (marked with `'use client'`):
- Enable interactivity and state
- Use React hooks
- Handle browser events
- Examples: `src/components/ui/counter.tsx`

### Layouts

Layouts provide shared UI that persists across pages:
- `app/layout.tsx` - Root layout (wraps entire app)
- `app/(app)/dashboard/layout.tsx` - Dashboard layout with sidebar

### API Routes

API endpoints are defined in `app/api/` using `route.ts` files:
- `GET /api/hello` - Example GET endpoint
- `POST /api/hello` - Example POST endpoint

## Key Features Demonstrated

1. **File-based routing** - Automatic routing based on folder structure
2. **Server Components** - Efficient server-side rendering by default
3. **Client Components** - Interactive UI with React hooks
4. **Nested layouts** - Shared UI across route segments
5. **Route groups** - Organize routes without URL impact
6. **API routes** - Built-in API endpoints
7. **TypeScript** - Full type safety
8. **Tailwind CSS** - Utility-first styling with dark mode support

## Development Guidelines

### Adding a New Page

Create a `page.tsx` file in the desired route folder:

```tsx
// src/app/my-page/page.tsx
export default function MyPage() {
  return <div>My Page</div>
}
```

### Creating Components

**Client Component** (for interactivity):
```tsx
'use client'
import { useState } from 'react'

export function MyComponent() {
  const [state, setState] = useState(0)
  return <button onClick={() => setState(state + 1)}>{state}</button>
}
```

**Server Component** (default):
```tsx
export function MyComponent() {
  return <div>Static content</div>
}
```

### Adding API Endpoints

Create a `route.ts` file in `src/app/api/`:

```tsx
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ data: 'example' })
}
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

For other platforms, build the production bundle:

```bash
npm run build
npm start
```
