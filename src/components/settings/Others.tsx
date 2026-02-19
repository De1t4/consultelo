
export default function Others() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Other Settings</h2>

      {/* Change Password */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Change Theme</h3>
        <div className="space-y-4 max-w-md w-full">
          <select
            id="theme"
            defaultValue={""}
            className="w-full px-3 py-2 border  border-gray-200 rounded-lg text-sm outline-none focus:border-teal-500 transition-colors"
          >
            <option value="" disabled>Select...</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Change Language</h3>
        <div className="space-y-4 max-w-md w-full">
          <select
            id="language"
            defaultValue={""}
            className="w-full px-3 py-2 border  border-gray-200 rounded-lg text-sm outline-none focus:border-teal-500 transition-colors"
          >
            <option value="" disabled>Select...</option>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  )
}
