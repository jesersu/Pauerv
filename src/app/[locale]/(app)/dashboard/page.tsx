import { Counter } from '@/components/ui/Counter'

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
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Users
          </h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">{stats.users}</p>
        </div>

        <div className="p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            Revenue
          </h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">{stats.revenue}</p>
        </div>

        <div className="p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 sm:col-span-2 lg:col-span-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            Orders
          </h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">{stats.orders}</p>
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Interactive Counter</h2>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          This is a Client Component example with state management:
        </p>
        <Counter />
      </div>
    </div>
  )
}
