import { ResponseConsultDetail } from '@/shared/types/response-consult'
import { Info } from 'lucide-react'
import { Button } from '../ui/Button'


export default function FeedbackConsult({ consultation }: { consultation: ResponseConsultDetail }) {
  return (
    <>
      {/* Contribute Feedback */}
      <article className="bg-card rounded-lg border border-border p-6">
        <div className="mb-4">
          <label htmlFor='feedback' className="font-semibold text-foreground mb-4">Professional Feedback</label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Text Area */}
            <textarea
              className="w-full p-4 text-sm text-muted-foreground focus:outline-none resize-none"
              rows={8}
              placeholder="Type your professional advice here... Reference specific codes or standards where applicable..."
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>All contributions are subject to professional review guidelines.</span>
          </div>
          <Button variant="primary">
            Submit Answer
          </Button>
        </div>
      </article>
    </>
  )
}
