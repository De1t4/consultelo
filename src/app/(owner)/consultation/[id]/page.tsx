'use client'
import CaseInfoConsult from "@/app/(owner)/consultation/[id]/components/CaseInfoConsult"
import CommentsConsult from "@/app/(owner)/consultation/[id]/components/CommentsConsult"
import FeedbackConsult from "@/app/(owner)/consultation/[id]/components/FeedbackConsult"
import PrincipalConsult from "@/app/(owner)/consultation/[id]/components/PrincipalConsult"
import SkeletonConsult from "@/components/skeletons/SkeletonConsult"
import { useConsultationId } from "@/hooks/use/use-consultation-id"
import { useSession } from "next-auth/react"
import { notFound, useParams } from "next/navigation"
import ShareConsult from "./components/ShareConsult"

export default function Page() {
  const params = useParams<{ id: string }>()
  const { data: session } = useSession()

  const { consultation, isLoading, error } =
    useConsultationId({ idParams: params.id });

  if (isLoading) return <SkeletonConsult />
  if (error) return <div>Error: {error.message}</div>
  if (consultation == null) return notFound()

  return (
    <>
      <title>{consultation.title}</title>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <section className="lg:col-span-2 space-y-6">
          <PrincipalConsult consultation={consultation} />
          <CommentsConsult consultation={consultation} />
          <FeedbackConsult consultation={consultation} />
        </section>
        {/* Right Sidebar */}
        <div className="space-y-6">
          <ShareConsult consultationId={consultation.id} isOwner={session?.user.id === consultation.userId} />
          <CaseInfoConsult consultation={consultation} />
        </div>
      </div>
    </>
  )
}
