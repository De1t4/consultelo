import { ResponseConsultList } from "@/shared/types/response-consult"
import { PropertyCard } from "./CardConsult"

export const CardDefault = ({ consultation }: { consultation: ResponseConsultList }) => {
  return (
    <>
      <PropertyCard.Container consultationId={consultation.id}>
        <PropertyCard.Overlay>
          <PropertyCard.Features status={consultation.status} consultationId={consultation.id} />
          <PropertyCard.Toogle consultation={consultation} />
        </PropertyCard.Overlay>
        <PropertyCard.Title title={consultation.title} />
        <PropertyCard.Description body={consultation.body} category={consultation.categories} />
        <PropertyCard.Footer
          date={consultation.createdAt.toDateString()}
          privacy={consultation.settings?.privacy || 'private'}
          totalComments={consultation._count.comments}
        />
      </PropertyCard.Container>
    </>
  )
}

export const CardDashboard = ({ consultation }: { consultation: ResponseConsultList }) => {
  return (
    <>
      <PropertyCard.Container consultationId={consultation.id}>
        <PropertyCard.Overlay>
          <PropertyCard.Features status={consultation.status} consultationId={consultation.id} />
        </PropertyCard.Overlay>
        <PropertyCard.Title title={consultation.title} />
        <PropertyCard.Description body={consultation.body} category={consultation.categories} />
        <PropertyCard.Footer
          date={consultation.createdAt.toDateString()}
          privacy={consultation.settings?.privacy || 'private'}
          totalComments={consultation._count.comments}
        />
      </PropertyCard.Container>
    </>
  )
}