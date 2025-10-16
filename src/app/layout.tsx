import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://pauerv.com'),
  title: {
    default: 'Pauerv - Software Development',
    template: '%s | Pauerv',
  },
  description: 'We build innovative software solutions tailored for you. Transform your ideas into powerful applications with our expert development team.',
  keywords: ['software development', 'web applications', 'mobile apps', 'custom software', 'technology solutions', 'app development'],
  authors: [{ name: 'Pauerv Team', url: 'https://pauerv.com' }],
  creator: 'Pauerv',
  publisher: 'Pauerv',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pauerv.com',
    title: 'Pauerv - Software Development',
    description: 'We build innovative software solutions tailored for you. Transform your ideas into powerful applications.',
    siteName: 'Pauerv',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pauerv - Software Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pauerv - Software Development',
    description: 'We build innovative software solutions tailored for you.',
    images: ['/twitter-image.png'],
    creator: '@pauerv',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
