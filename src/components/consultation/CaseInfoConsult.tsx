import { ResponseConsultDetail } from '@/shared/types/response-consult'
import { Info } from 'lucide-react'

export default function CaseInfoConsult({ consultation }: { consultation: ResponseConsultDetail }) {
  return (
    <aside className="space-y-6">
      {/* Case Info */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground text-sm">CASE INFO</h3>
          <Info className="h-4 w-4 text-gray-400" />
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="text-teal-600 font-medium capitalize">{consultation.status}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Category</span>
            <span className="text-foreground capitalize">{consultation.categories}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Privacy</span>
            <span className="text-foreground capitalize">{consultation.settings?.privacy || 'default'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Type</span>
            <span className="text-foreground capitalize">{consultation.settings?.type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">View Comments</span>
            <span className="text-foreground capitalize">{consultation.settings?.viewComments ? 'Yes' : 'No'}</span>
          </div>
        </div>

        {/* Engagement Score */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-teal-600">COMMENTS</span>
            <span className="text-sm font-semibold text-gray-900">{consultation.comments.length}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-[20%] bg-linear-to-r from-cyan-400 to-teal-500"></div>
          </div>
        </div>
      </div>
    </aside>
  )
}
