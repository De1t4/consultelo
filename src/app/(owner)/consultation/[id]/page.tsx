'use client'
import { getConsultationByIdAction } from "@/actions/consultation-queries"
import CaseInfoConsult from "@/app/(owner)/consultation/[id]/components/CaseInfoConsult"
import CommentsConsult from "@/app/(owner)/consultation/[id]/components/CommentsConsult"
import FeedbackConsult from "@/app/(owner)/consultation/[id]/components/FeedbackConsult"
import PrincipalConsult from "@/app/(owner)/consultation/[id]/components/PrincipalConsult"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

export default function Page() {
  const params = useParams<{ id: string }>()

  const { data: consultation, isLoading, error } = useQuery({
    queryKey: ["consultation", params.id],
    queryFn: () => getConsultationByIdAction(params.id),
  });

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!consultation) return <div>Consultation not found</div>

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <section className="lg:col-span-2 space-y-6">
          <PrincipalConsult consultation={consultation} />
          <CommentsConsult consultation={consultation} />
          <FeedbackConsult consultation={consultation} />
        </section>
        {/* Right Sidebar */}
        <CaseInfoConsult consultation={consultation} />
      </div>
    </>
  )
}
