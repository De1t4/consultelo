'use client'

import { getMyConsultationsAction } from '@/actions/consultation-queries'
import RowConsult from '@/components/ui/RowConsult'
import { ResponseConsultList } from '@/shared/types/response-consult'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown, Filter, LayoutGrid, List, Tag } from 'lucide-react'
import { useState } from 'react'
import CardConsult from '../../../../components/ui/CardConsult'

type ViewMode = 'grid' | 'list';

export default function ConsultationList({ consultations }: { consultations: ResponseConsultList[] }) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const { data: consultation } = useQuery({
    queryKey: ['consultations'],
    queryFn: getMyConsultationsAction,
    initialData: consultations,
  })

  return (
    <>
      <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2">
        <h2 className='text-foreground text-lg font-semibold tracking-tight max-md:text-left'>Recent inquiries</h2>

        <div className="flex items-center gap-2 max-md:flex-col max-md:w-full max-md:items-start">
          {/* Filter Status */}
          <div className="flex justify-center gap-2 items-center max-md:justify-between max-md:w-full">
            <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-card/10 transition-colors">
              <Filter className="h-4 w-4 text-gray-400" />
              All Status
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            {/* Category */}
            <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-card/10 transition-colors">
              <Tag className="h-4 w-4 text-gray-400" />
              Category
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* View toggles */}
          <div className="flex max-md:hidden items-center border border-border rounded-lg overflow-hidden bg-muted-foreground/20">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-teal-50 text-primary' : 'text-foreground hover:opacity-50'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-teal-50 text-primary' : 'text-foreground hover:opacity-50'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      {consultation.length === 0 && (
        <p className='text-foreground'>You don{`'`}t have any consultations</p>
      )}

      {viewMode === 'grid' ? (
        <ol className='grid grid-cols-2 max-md:grid-cols-1 gap-4 w-full mt-4 border-t pt-8 border-border'>
          {consultation.map((consultation) => {
            return (
              <li key={consultation.id} >
                <CardConsult consultation={consultation} />
              </li>
            )
          }
          )}
        </ol>
      ) : (
        <div className="flex flex-col gap-4 mt-4 border-t pt-8 border-border">
          {consultation.map((consultation) => (
            <RowConsult key={consultation.id} consultation={consultation} />
          ))}
        </div>
      )}

    </>
  )
}
