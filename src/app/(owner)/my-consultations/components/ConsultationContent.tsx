'use client'

import { getMyConsultationsAction } from '@/actions/consultation-queries'
import { Button } from '@/components/ui/Button'
import RowConsult from '@/components/ui/RowConsult'
import { ConsultationCategory, ConsultationStatus, ConsultationCategory as category, ConsultationStatus as status } from '@/generated/prisma/enums'
import { useConsults } from '@/hooks/use/use-consult'
import { ResponseConsultList } from '@/shared/types/response-consult'
import CardConsult from '@components/ui/CardConsult'
import { useQuery } from '@tanstack/react-query'
import { FolderOpen, LayoutGrid, List } from 'lucide-react'
import Link from 'next/link'

export default function ConsultationContent({ consultations }: { consultations: ResponseConsultList[] }) {

  const { data: consultationsData } = useQuery({
    queryKey: ['consultations'],
    queryFn: getMyConsultationsAction,
    initialData: consultations,
  })

  const { setFilterCategory, setFilterStatus, setViewMode, viewMode, filteredConsultations } =
    useConsults({ consultations: consultationsData })

  return (
    <>
      <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2">
        <h2 className='text-foreground text-lg font-semibold tracking-tight max-md:text-left'>Recent inquiries</h2>
        <div className="flex items-center gap-2 max-md:flex-col max-md:w-full max-md:items-start">
          {/* Filter Status */}
          <div className="flex justify-center gap-2 items-center max-md:justify-between max-md:w-full">
            <select
              disabled={consultations.length === 0}
              onChange={(e) => setFilterStatus(e.target.value as ConsultationStatus)}
              defaultValue={""}
              name="status"
              className='flex w-32 items-center disabled:text-gray-500 disabled:cursor-not-allowed gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-card/10 transition-colors' id="">
              <option value="" className='bg-card text-foreground'>
                All Status
              </option>
              <option value={status.draft} className='bg-card text-foreground'>
                Draft
              </option>
              <option value={status.archived} className='bg-card text-foreground'>
                Archived
              </option>
              <option value={status.active} className='bg-card text-foreground'>
                Active
              </option>
              <option value={status.closed} className='bg-card text-foreground'>
                Closed
              </option>
            </select>
            {/* Category */}
            <select
              disabled={consultations.length === 0}
              onChange={(e) => setFilterCategory(e.target.value as ConsultationCategory)}
              name="category"
              defaultValue={""}
              className='flex w-32 items-center disabled:text-gray-500 disabled:cursor-not-allowed gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-card/10 transition-colors' id="">
              <option value="" className='bg-card text-foreground'>
                Category
              </option>
              <option value={category.software} className='bg-card text-foreground'>Software</option>
              <option value={category.IA} className='bg-card text-foreground'>IA</option>
              <option value={category.business} className='bg-card text-foreground'>Business</option>
              <option value={category.company} className='bg-card text-foreground'>Company</option>
              <option value={category.strategy} className='bg-card text-foreground'>Strategy</option>
              <option value={category.other} className='bg-card text-foreground'>Other</option>
            </select>
          </div>

          {/* View toggles */}
          <div className="flex max-md:hidden items-center border border-border rounded-lg overflow-hidden bg-muted-foreground/20">
            <button
              onClick={() => setViewMode('grid')}
              disabled={consultationsData.length == 0}
              className={`p-2 transition-colors disabled:brightness-80 disabled:cursor-not-allowed cursor-pointer ${viewMode === 'grid' ? 'bg-teal-50 text-primary' : 'text-foreground hover:opacity-50'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              disabled={consultationsData.length == 0}
              className={`p-2 transition-colors disabled:brightness-80 disabled:cursor-not-allowed cursor-pointer ${viewMode === 'list' ? 'bg-teal-50 text-primary' : 'text-foreground hover:opacity-50'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>


      {viewMode === 'grid' ? (
        <ol className='grid grid-cols-2 max-md:grid-cols-1 gap-4 w-full mt-4 border-t pt-8 border-border'>
          {filteredConsultations.map((consultation) => {
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
          {filteredConsultations.map((consultation) => (
            <RowConsult key={consultation.id} consultation={consultation} />
          ))}
        </div>
      )}
      {filteredConsultations.length === 0 && (
        <div className='flex items-center gap-2 mt-4 flex-col h-[50vh] justify-center'>
          <FolderOpen className="h-16 w-16 text-muted-foreground" />
          <p className='text-foreground text-lg font-semibold tracking-tight'>You don{`'`}t have any consultations</p>
          <p className='text-muted-foreground text-sm'>Create a new consultation to get started</p>
          <Link href="/consultation">
            <Button variant='primary'>
              Create Consultation
            </Button>
          </Link>
        </div>
      )}
    </>
  )
}
