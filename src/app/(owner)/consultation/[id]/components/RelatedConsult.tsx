import SkeletonRelated from "@/components/skeletons/SkeletonRelated";
import { Button } from "@/components/ui/Button";
import { useRelatedConsultations } from "@/features/consultations/hooks/use-consult-related";
import { ResponseConsultDetail } from "@/shared/types/response-consult";
import { categoryStyles } from "@/shared/utils/card-utils";
import Link from "next/link";
import { useState } from "react";

const LIMIT = 3

export default function RelatedConsult({ consultation }: { consultation: ResponseConsultDetail }) {
  const [limit, setLimit] = useState(LIMIT)
  const { consultation: relatedConsultations, isLoading, error } = useRelatedConsultations({
    idConsultation: consultation.id,
    idUser: consultation.userId,
    category: consultation.categories,
  });

  if (error) return null
  if (isLoading) return <SkeletonRelated />

  const relatedConsultationsData = relatedConsultations?.data || [];

  return (
    <div className="space-y-6">
      {/* Case Info */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between ">
          <h2 className="font-semibold text-foreground text-sm">RELATED CONSULT</h2>
        </div>
        {
          relatedConsultationsData.length === 0 && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold text-foreground text-sm">No related consultations</h3>
              </div>
            </div>
          )
        }
        {relatedConsultationsData.length > 0 && (
          <ul className="flex flex-col">
            {relatedConsultationsData.slice(0, limit).map((relatedConsult) => (
              <Link href={`/consultation/${relatedConsult.id}`} key={relatedConsult.id}>
                <li className="bg-card hover:border-primary shadow active:border-primary border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer mt-2">
                  <h3 className="font-semibold text-foreground text-sm text-wrap line-clamp-2">{relatedConsult.title}</h3>
                  <div className="flex gap-2 items-center mt-2">
                    <span className={`px-2 py-1 rounded-full ${categoryStyles[relatedConsult.categories]}`}>
                      <p className={`text-[10px] font-bold tracking-wide`}>
                        {relatedConsult.categories.toUpperCase()}
                      </p>
                    </span>
                    <p className="text-muted-foreground text-sm">{relatedConsult._count.comments} comments</p>
                  </div>
                </li>
              </Link>
            ))}
            {
              relatedConsultationsData.length > LIMIT && (
                <li className={`cursor-pointer mt-4 flex justify-center ${limit >= relatedConsultationsData.length ? 'hidden' : ''}`}>
                  <Button variant="outline" onClick={() => setLimit(limit + LIMIT)}>
                    View all
                  </Button>
                </li>
              )
            }
          </ul>
        )}
      </div>
    </div>
  )
}
