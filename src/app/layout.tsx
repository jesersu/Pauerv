import type { ReactNode } from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  // The [locale] layout will render the <html> and <body> tags
  return children
}
