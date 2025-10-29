import { Navigation } from '@/components/landing/navigation'
import { ScrollHero } from '@/components/landing/scroll-hero'
import { PlaceholderSections } from '@/components/landing/placeholder-sections'
import { TechCarousel } from '@/components/landing/tech-carousel'

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
