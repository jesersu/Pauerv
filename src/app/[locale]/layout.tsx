import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Footer } from '@/components/layout/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Poppins, Josefin_Sans, Josefin_Slab } from 'next/font/google'
import type { Viewport } from 'next'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-josefin-sans',
})

const josefinSlab = Josefin_Slab({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-josefin-slab',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages({ locale }) as any

  return {
    metadataBase: new URL('https://pauerv.com'),
    title: {
      default: messages.metadata.title,
      template: messages.metadata.titleTemplate,
    },
    description: messages.metadata.description,
    keywords: messages.metadata.keywords.split(', '),
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
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      url: `https://pauerv.com/${locale}`,
      title: messages.metadata.ogTitle,
      description: messages.metadata.ogDescription,
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
      title: messages.metadata.twitterTitle,
      description: messages.metadata.twitterDescription,
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
    alternates: {
      languages: {
        en: '/en',
        es: '/es',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.variable} ${josefinSans.variable} ${josefinSlab.variable} ${poppins.className}`}>
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
