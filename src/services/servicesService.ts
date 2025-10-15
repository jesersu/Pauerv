interface Service {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
}

/**
 * Fetches all services
 * Currently returns hardcoded data, but can be replaced with an API call
 */
export async function getServices(): Promise<Service[]> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/services')
  // return response.json()

  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return [
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
    // {
    //   id: 4,
    //   title: 'Cloud Solutions',
    //   description: 'Deploy and manage scalable cloud infrastructure with modern DevOps practices and automation.',
    //   image: '/images/services/cloud-solutions.svg',
    //   technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker'],
    //   link: '#cloud-solutions',
    // },
    // {
    //   id: 5,
    //   title: 'AI & Machine Learning',
    //   description: 'Implement intelligent solutions using artificial intelligence and machine learning algorithms.',
    //   image: '/images/services/ai-ml.svg',
    //   technologies: ['TensorFlow', 'PyTorch', 'Python', 'Data Science'],
    //   link: '#ai-ml',
    // },
    // {
    //   id: 6,
    //   title: 'E-Commerce Solutions',
    //   description: 'Build robust online stores with secure payment processing and inventory management systems.',
    //   image: '/images/services/ecommerce.svg',
    //   technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal'],
    //   link: '#ecommerce',
    // },
  ]
}

export type { Service }
