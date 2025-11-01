import Link from 'next/link'

export const metadata = {
  title: 'About - Pauerv',
  description: 'Learn more about this Next.js App Router project',
}

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">About This Project</h1>

        <div className="space-y-4 text-lg">
          <p>
            This is a Next.js application built with the App Router architecture,
            demonstrating modern React patterns and best practices.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Tech Stack</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Next.js 15 with App Router</li>
            <li>TypeScript for type safety</li>
            <li>Tailwind CSS for styling</li>
            <li>Server and Client Components</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Architecture</h2>
          <p>
            The project follows Feature-Sliced Design principles with clear
            separation between marketing pages and application features.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block mt-8 text-blue-500 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
