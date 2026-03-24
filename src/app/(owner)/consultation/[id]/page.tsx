'use client'
import CaseInfoConsult from "@/app/(owner)/consultation/[id]/components/CaseInfoConsult"
import CommentsConsult from "@/app/(owner)/consultation/[id]/components/CommentsConsult"
import FeedbackConsult from "@/app/(owner)/consultation/[id]/components/FeedbackConsult"
import PrincipalConsult from "@/app/(owner)/consultation/[id]/components/PrincipalConsult"
import SkeletonConsult from "@/components/skeletons/SkeletonConsult"
import { useConsultationId } from "@/features/consultations"
import { useSession } from "next-auth/react"
import { notFound, useParams } from "next/navigation"
import RelatedConsult from "./components/RelatedConsult"
import ShareConsult from "./components/ShareConsult"

export default function Page() {
  const params = useParams<{ id: string }>()
  const { data: session } = useSession()

  const { consultation, isLoading, error } =
    useConsultationId({ idParams: params.id });

  if (isLoading) return <SkeletonConsult />
  if (error) return <div>Error: {error.message}</div>
  if (consultation?.data == null) return notFound()

  const { data } = consultation;
  const isOwner = session?.user.id === data.userId

  return (
    <>
      <title>{data.title}</title>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <section className="lg:col-span-2 space-y-6">
          <PrincipalConsult consultation={data} />
          <CommentsConsult consultation={data} />
          {data.status === "active" && <FeedbackConsult consultation={data} />}
        </section>
        {/* Right Sidebar */}
        <div className="space-y-6">
          <ShareConsult consultationId={data.id} isOwner={isOwner} />
          <CaseInfoConsult consultation={data} />
          <RelatedConsult consultation={data} />
        </div>
      </div>
    </>
  )
}
