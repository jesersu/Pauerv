import { Counter } from '@/components/ui/counter'

export const metadata = {
  title: 'Dashboard - Pauerv',
  description: 'Application dashboard',
}

// Server Component - can fetch data directly
async function getStats() {
  // Simulate API call
  return {
    users: 1234,
    revenue: '$45,231',
    orders: 567,
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Users
          </h3>
          <p className="text-3xl font-bold mt-2">{stats.users}</p>
        </div>

        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Revenue
          </h3>
          <p className="text-3xl font-bold mt-2">{stats.revenue}</p>
        </div>

        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Orders
          </h3>
          <p className="text-3xl font-bold mt-2">{stats.orders}</p>
        </div>
      </div>

      <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Interactive Counter</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          This is a Client Component example with state management:
        </p>
        <Counter />
      </div>
    </div>
  )
}
