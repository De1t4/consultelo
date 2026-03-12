import ResetPasswordForm from './form/ResetPasswordForm'

export default function Security() {
  return (
    <div className="bg-card rounded-lg border border-border p-6 w-full">
      <h2 className="text-lg font-semibold text-foreground mb-6">Security</h2>
      <ResetPasswordForm />
    </div>
  )
}
