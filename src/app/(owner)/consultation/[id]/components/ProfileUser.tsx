import { ActionMenu } from '@/components/ui/ActionMenu'
import { UserResponse } from '@/shared/types/response-consult'
import {
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Info,
  ShieldCheck
} from 'lucide-react'

export default function ProfileUser({ user }: { user: UserResponse | null }) {
  if (!user) return null

  const initials = user.username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <ActionMenu align='left' trigger={
      <div className="flex items-center gap-2 group cursor-pointer ">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors underline">
          {user.username}
        </h3>
      </div>
    }>
      <div className="max-md:min-w-[75dvw] max-w-[50dvw] min-w-[250px] p-0 overflow-hidden rounded-xl border-none">
        {/* Header/Banner sutil */}
        <div className="h-16 bg-linear-to-br from-primary to-primary/60" />

        <div className="px-5 pb-5 -mt-8">
          <div className="flex items-end justify-between mb-4">
            <div className="w-16 h-16 rounded-2xl bg-card border-4 border-background flex items-center justify-center text-primary text-xl font-bold shadow-sm">
              {initials}
            </div>
            {user.role === 'admin' && (
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Admin
              </span>
            )}
          </div>

          <div className="space-y-1 mb-4">
            <h4 className="text-lg font-bold text-foreground leading-tight">{user.username}</h4>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
            </div>
          </div>

          {user.bio && (
            <div className="mb-4 p-3 rounded-lg bg-accent/50 border border-accent">
              <div className="flex gap-2">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/80 leading-relaxed italic">
                  &ldquo;{user.bio}&rdquo;
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {user.profession && (
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-tight leading-none mb-1">Profession</p>
                  <p className="font-medium">{user.profession}</p>
                </div>
              </div>
            )}

            {user.phone && (
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-tight leading-none mb-1">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 text-sm text-foreground/70">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-tight leading-none mb-1">Member since</p>
                <p className="font-medium">{user.createdAt.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="px-5 py-3 bg-secondary/5 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
              {user.isActive ? 'Active Now' : 'Offline'}
            </span>
          </div>
          <button className="text-[11px] font-bold text-primary hover:underline cursor-pointer uppercase tracking-wide">
            View full profile
          </button>
        </div> */}
      </div>
    </ActionMenu>
  )
}
