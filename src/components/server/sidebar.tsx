import Link from 'next/link'

export function Sidebar() {
  const menuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/settings', label: 'Settings' },
    { href: '/', label: 'Home' },
  ]

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-6 border-r border-gray-200 dark:border-gray-800">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Pauerv</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">App Dashboard</p>
      </div>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
