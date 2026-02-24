'use client'

import { getMyConsultationsAction } from '@/actions/consultation-queries'
import { ResponseConsultList } from '@/shared/types/response-consult'
import { useQuery } from '@tanstack/react-query'
import Card from '../ui/Card'

export default function ConsultationList({ consultations }: { consultations: ResponseConsultList[] }) {
  const { data } = useQuery({
    queryKey: ['consultations'],
    queryFn: getMyConsultationsAction,
    initialData: consultations,
  })

  return (
    <>
      <h2 className='text-foreground text-3xl font-bold tracking-tight'>My Consultations</h2>
      {data.length === 0 && (
        <p className='text-foreground'>You don{`'`}t have any consultations</p>
      )}
      <ol className='grid grid-cols-2 max-md:grid-cols-1 gap-4 w-full mt-4'>
        {data.map((consultation) => {
          return (
            <Card key={consultation.id} inquiry={consultation} />
          )
        }
        )}
      </ol>
    </>
  )
}
