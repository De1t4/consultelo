import { Button } from '../ui/Button'

export default function Security() {
  return (
    <div className="bg-card rounded-lg border border-border p-6 w-full">
      <h2 className="text-lg font-semibold text-foreground mb-6">Security</h2>

      {/* Change Password */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-4">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div className="grid grid-cols-1 gap-4 max-md:grid-cols-1">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          <Button variant='outline' className="px-4 py-2">
            Update Password
          </Button>
        </div>
      </div>

    </div>
  )
}
