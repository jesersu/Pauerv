import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - static files (images, fonts, etc.)
  matcher: ['/', '/(en|es)/:path*', '/((?!api|_next|.*\\..*).*)'],
}
