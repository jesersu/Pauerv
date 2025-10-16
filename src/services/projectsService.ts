interface Project {
  id: number
  title: string
  description: string
  image: string
  link: string
}

/**
 * Fetches all projects
 * Currently returns hardcoded data, but can be replaced with an API call
 */
export async function getProjects(): Promise<Project[]> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/projects')
  // return response.json()

  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern shopping experience with seamless checkout',
      image: '/images/project/project-1.png',
      link: '#project-1',
    },
    {
      id: 2,
      title: 'Healthcare Dashboard',
      description: 'Patient management system with real-time analytics',
      image: '/images/project/project2.jpg',
      link: '#project-2',
    },
    {
      id: 3,
      title: 'Social Media App',
      description: 'Connect and share with your community',
      image: '/images/project/project3.jpg',
      link: '#project-3',
    },
    {
      id: 4,
      title: 'Finance Tracker',
      description: 'Smart budgeting and expense management',
      image: '/images/project/project4.jpg',
      link: '#project-4',
    },
    {
      id: 5,
      title: 'Learning Platform',
      description: 'Interactive courses and skill development',
      image: '/images/project/project5.jpg',
      link: '#project-5',
    },
  ]
}

export type { Project }
