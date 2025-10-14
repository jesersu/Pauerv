import { Sidebar } from '@/components/server/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  )
}
