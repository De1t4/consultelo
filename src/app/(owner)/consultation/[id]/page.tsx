'use client'
import { getConsultationByIdAction } from "@/actions/consultation-action"
import CaseInfoConsult from "@/components/consultation/CaseInfoConsult"
import CommentsConsult from "@/components/consultation/CommentsConsult"
import FeedbackConsult from "@/components/consultation/FeedbackConsult"
import PrincipalConsult from "@/components/consultation/PrincipalConsult"
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
