import { Navigation } from '@/components/layout/Navigation'
import { ScrollHero } from '@/components/landing/ScrollHero'
import { PlaceholderSections } from '@/components/landing/PlaceholderSections'
import { TechCarousel } from '@/components/landing/TechCarousel'

export default function Home() {
  return (
    <>
      <Navigation />
      <ScrollHero />
      <TechCarousel />
      <PlaceholderSections />
    </>
  )
}
