import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export default function Account() {
  const [isEdit, setIsEdit] = useState(false)
  const { data: session } = useSession()

  if (!session) {
    return (
      <p>
        User not authenticated
      </p>
    )
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
        <button type='button' onClick={() => setIsEdit(!isEdit)} className="text-primary text-sm font-medium hover:underline cursor-pointer">
          Edit Profile
        </button>
      </div>

      <div className="space-y-6">
        {/* Full Name & Professional Title */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={session.user.name?.toString()}
              disabled
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Professional Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Bio</label>
          <textarea
            rows={4}
            placeholder='Write something about yourself...'
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">Brief description for your public profile</p>
        </div>

      </div>

      <div className="flex justify-end mt-6">
        <Button disabled={!isEdit} variant='primary' className="px-6 py-2 disabled:cursor-not-allowed">
          Save Profile Changes
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
        <input
          type="text"
          defaultValue={session.user.email?.toString()}
          disabled
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        />
      </div>

      <hr className="my-8 border-border" />
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-4">Delete Account</h3>
        <p className="text-sm text-muted-foreground mb-4">Deleting your account will permanently remove all your data</p>
        <Button variant='outline' className="px-4 py-2 border-destructive text-destructive hover:bg-destructive hover:text-white">
          Delete Account
        </Button>
      </div>
    </div>
  )
}
