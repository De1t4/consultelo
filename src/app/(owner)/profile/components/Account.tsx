"use client"

import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useDeleteAccount } from '@/features/account'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import ProfileForm from './form/ProfileForm'

export default function Account() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const { deleteAccount, isPending } = useDeleteAccount()

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      onSuccess: () => setIsOpen(false)
    })
  }

  if (!session) {
    return (
      <p>
        User not authenticated
      </p>
    )
  }


  return (
    <div className="bg-card rounded-lg border border-border p-6 w-full">
      <ProfileForm />
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
        <Button onClick={() => setIsOpen(true)} variant='destructive' className="px-4 py-2 border-destructive text-destructive hover:bg-destructive hover:text-white">
          Delete Account
        </Button>
      </div>
      <Modal size='sm' title='Delete your account' isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='flex flex-col gap-4 text-center'>
          <p className='text-foreground text-lg'>Are you sure you want to delete your account?</p>
          <p className='text-sm text-muted-foreground'>Your will lose all your data, including your consultations and messages.</p>
          <div className='flex justify-between gap-2'>
            <Button onClick={() => setIsOpen(false)} variant='primary'>
              Cancel
            </Button>
            <Button disabled={isPending} onClick={handleDeleteAccount} variant='destructive' className="px-4 py-2 border-destructive text-destructive hover:bg-destructive hover:text-white">
              Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
