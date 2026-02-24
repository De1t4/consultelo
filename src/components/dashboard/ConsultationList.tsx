'use client'

import { getMyConsultationsAction } from '@/actions/consultation-queries'
import { ResponseConsultList } from '@/shared/types/response-consult'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../ui/Button'
import Link from 'next/link'

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
      <ol className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 w-full mt-4'>
        {data.map((consultation) => {
          return (
            <li className='border border-border p-4 rounded-lg w-full bg-card shadow-md' key={consultation.id}>
              <h2 className='text-foreground font-bold text-2xl'>{consultation.title}</h2>
              <p className='text-foreground'>{consultation.createdAt.toDateString()}</p>
              <p className='text-foreground'>{consultation.status}</p>
              <p className='text-foreground'>{consultation.settings?.privacy}</p>
              <Link href={`/consultation/${consultation.id}`}>
                <Button variant='outline' className='w-full'>
                  View
                </Button>
              </Link>
            </li>
          )
        }
        )}
      </ol>
    </>
  )
}
