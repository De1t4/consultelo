import { ResponseConsultDetail } from '@/shared/types/response-consult'
import { User } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function CommentsConsult({ consultation }: { consultation: ResponseConsultDetail }) {
  const { data: session } = useSession()

  const comments = consultation.comments || []
  const isOwner = consultation.userId === session?.user.id

  if (!isOwner && !consultation.settings?.viewComments) {
    return null
  }

  return (
    <>
      <article className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">Comments</h2>
            <span className="text-sm text-muted-foreground">({consultation._count.comments})</span>
          </div>
        </div>

        <div className="space-y-6">
          {consultation._count.comments === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first to participate!</p>
          ) : (
            comments.map((comment, index) => (
              <div key={comment.id} className={`${index > 0 ? 'pt-6 border-t border-border' : ''} flex items-start gap-4`}>
                <div className="h-10 w-10 bg-teal-500 rounded-full  flex items-center justify-center text-white font-semibold">
                  {comment.user?.username?.slice(0, 2).toUpperCase() || <User size={20} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-semibold text-foreground">
                      {
                        consultation.settings?.allowAnonymous ? "Anonymous" : comment.user?.username
                      }
                    </h4>
                    {
                      !consultation.settings?.allowAnonymous &&
                      <p className="text-sm text-muted-foreground">{comment.user?.email}</p>
                    }                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Posted on {new Date(comment.createdAt).toLocaleDateString()}
                  </p>

                  <div className="prose prose-sm max-w-none text-foreground text-wrap mb-4">
                    <p>{comment.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </article>
    </>
  )
}
