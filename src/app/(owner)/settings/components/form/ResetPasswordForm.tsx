import { Button } from '@/components/ui/Button'
import { useResetPassword } from '@/features/account'
import { FormDataResetPassword, SchemaResetPassword } from '@/features/account/schemas/schema-reset-password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function ResetPasswordForm() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormDataResetPassword>({
    resolver: zodResolver(SchemaResetPassword),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const { isPending, resetPassword } = useResetPassword()

  const onSumbit = (data: FormDataResetPassword) => {
    resetPassword(data, {
      onSuccess() {
        reset()
      }
    })
  }

  return (
    <form className="mb-8 " onSubmit={handleSubmit(onSumbit)}>
      <h3 className="text-sm font-semibold text-foreground mb-4">Change Password</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 max-md:grid-cols-1">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Old Password</label>
            <input
              type="password"
              {...register('oldPassword')}
              placeholder='**********'
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 mb-1 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">New Password</label>
            <input
              type="password"
              {...register('newPassword')}
              placeholder='**********'
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 mb-1 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Confirm New Password</label>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder='**********'
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 mb-1 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
        </div>
        <div className="w-full flex justify-start max-md:justify-center">
          <Button variant='outline' disabled={isPending} type='submit' className="px-4 py-2">
            {isPending ? 'Updating...' : 'Update Password'}
          </Button>
        </div>
      </div>
    </form>
  )
}
