interface Service {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
}

// Service data with translations
const servicesData = {
  en: [
    {
      id: 1,
      title: 'Web Development',
      description: 'Build modern, responsive websites and web applications with cutting-edge technologies and best practices.',
      image: '/images/services/web-development.png',
      technologies: ['React', 'Angular JS', 'Vue', 'Next.js'],
      link: '#web-development',
    },
    {
      id: 2,
      title: 'Mobile Development',
      description: 'Create native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
      image: '/images/services/mobile-development.png',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
      link: '#mobile-development',
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Design intuitive and beautiful user interfaces with a focus on user experience and accessibility.',
      image: '/images/services/ui-ux-design.png',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      link: '#ui-ux-design',
    },
  ],
  es: [
    {
      id: 1,
      title: 'Desarrollo Web',
      description: 'Construye sitios web y aplicaciones web modernas y responsivas con tecnologías de vanguardia y mejores prácticas.',
      image: '/images/services/web-development.png',
      technologies: ['React', 'Angular JS', 'Vue', 'Next.js'],
      link: '#web-development',
    },
    {
      id: 2,
      title: 'Desarrollo Móvil',
      description: 'Crea aplicaciones móviles nativas y multiplataforma para iOS y Android con experiencias de usuario fluidas.',
      image: '/images/services/mobile-development.png',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
      link: '#mobile-development',
    },
    {
      id: 3,
      title: 'Diseño UI/UX',
      description: 'Diseña interfaces de usuario intuitivas y hermosas con enfoque en la experiencia de usuario y accesibilidad.',
      image: '/images/services/ui-ux-design.png',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      link: '#ui-ux-design',
    },
  ],
}

/**
 * Fetches all services for a specific locale
 * Currently returns hardcoded data, but can be replaced with an API call
 */
export async function getServices(locale: 'en' | 'es' = 'en'): Promise<Service[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/services?locale=${locale}`)
  // return response.json()

  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return servicesData[locale] || servicesData.en
}

export type { Service }
