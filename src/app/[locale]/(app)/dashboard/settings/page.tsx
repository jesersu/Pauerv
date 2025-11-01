export const metadata = {
  title: 'Settings - Pauerv',
  description: 'Application settings',
}

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure your profile preferences here.
          </p>
        </div>

        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage notification settings and preferences.
          </p>
        </div>

        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Privacy</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Control your privacy and data sharing settings.
          </p>
        </div>
      </div>
    </div>
  )
}
