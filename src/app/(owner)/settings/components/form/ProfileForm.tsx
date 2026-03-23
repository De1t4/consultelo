"use client"
import { Button } from '@/components/ui/Button';
import { useProfile, useUpdateProfile } from '@/features/account';
import { FormDataAccount, SchemaAccount } from '@/features/account/schemas/schema-account';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ProfileForm() {
  const [isEdit, setIsEdit] = useState(false)

  const { profile, isLoading, isError } = useProfile();
  const { updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataAccount>({
    resolver: zodResolver(SchemaAccount),
    values: {
      username: profile?.user.username || "",
      profession: profile?.user.profession || "",
      bio: profile?.user.bio || "",
    }
  })

  if (isLoading) return <div className="p-4 text-center text-muted-foreground">Loading profile...</div>
  if (isError) return <div className="p-4 text-center text-destructive">Error loading profile</div>

  const onSubmit = (data: FormDataAccount) => {
    updateProfile(data, {
      onSuccess: () => setIsEdit(false)
    })
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
        <Button type='button' variant='outline' onClick={() => setIsEdit(!isEdit)} className="text-primary text-sm font-medium hover:underline cursor-pointer">
          {isEdit ? "Cancel" : "Edit Profile"}
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-md:space-y-4 mb-4">
        {/* Full Name & Professional Title */}
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <div>
            <label htmlFor='username' className="block text-sm font-medium text-muted-foreground mb-2">Username</label>
            <input
              type="text"
              id='username'
              maxLength={100}
              {...register("username")}
              disabled={!isEdit}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor='profession' className="block text-sm font-medium text-muted-foreground mb-2">Professional Title</label>
            <input
              type="text"
              id='profession'
              {...register("profession")}
              disabled={!isEdit}
              maxLength={255}
              placeholder='e.g. Chief Executive Officer'
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label htmlFor='bio' className="block text-sm font-medium text-muted-foreground mb-2">Bio</label>
          <textarea
            rows={4}
            id='bio'
            placeholder='Write something about yourself...'
            {...register("bio")}
            disabled={!isEdit}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">Brief description for your public profile</p>
        </div>
        <div className="flex justify-end mt-6 max-md:w-full max-md:justify-center">
          <Button type='submit' disabled={!isEdit || isPending} variant='primary' className="px-6 py-2 disabled:cursor-not-allowed">
            Save Profile Changes
          </Button>
        </div>
      </form>
    </>
  )
}
