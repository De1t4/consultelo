import { Button } from '../ui/Button'

export default function Security() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Security</h2>

      {/* Change Password */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div className="grid grid-cols-1 gap-4 max-md:grid-cols-1">
            <div>
              <label className="block text-sm text-gray-700 mb-2">New Password</label>
              <input
                type="password"

                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"

                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
          <Button variant='outline' className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Update Password
          </Button>
        </div>
      </div>

    </div>
  )
}
