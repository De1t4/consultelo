'use client'

import { getMyConsultationsAction } from '@/actions/consultation-queries'
import { CardDefault } from '@/components/ui/CardConsult/Card'
import { FilterSelect } from '@/components/ui/FilterSelect'
import RowConsult from '@/components/ui/RowConsult'
import { ConsultationCategory, ConsultationStatus } from '@/generated/prisma/enums'
import { useConsults } from '@/hooks/use/use-consult'
import { ResponseConsultList } from '@/shared/types/response-consult'
import { categoryOptions, statusOptions } from '@/shared/utils/list-options'
import { useQuery } from '@tanstack/react-query'
import EmptyState from './EmptyState'
import { ViewSwitcher } from './ViewWatcher'

export default function ConsultationContent({ consultations }: { consultations: ResponseConsultList[] }) {
  const { data: consultationsData = [] } = useQuery({
    queryKey: ['consultations'],
    queryFn: getMyConsultationsAction,
    initialData: consultations,
  });

  const {
    setFilterCategory,
    setFilterStatus,
    filterStatus,
    filterCategory,
    setViewMode,
    viewMode,
    filteredConsultations
  } = useConsults({ consultations: consultationsData });

  const hasConsultations = consultationsData.length > 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Controls */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className='text-2xl font-bold tracking-tight text-foreground mb-2'>My Consultations</h2>
          <p className='text-sm text-muted-foreground'>Manage and track your expert inquiries</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect
            label="All Status"
            value={filterStatus}
            onChange={(val) => setFilterStatus(val as ConsultationStatus)}
            options={statusOptions}
            disabled={!hasConsultations}
          />
          <FilterSelect
            label="All Categories"
            value={filterCategory}
            onChange={(val) => setFilterCategory(val as ConsultationCategory)}
            options={categoryOptions}
            disabled={!hasConsultations}
          />
          <ViewSwitcher
            mode={viewMode}
            onToggle={setViewMode}
            disabled={!hasConsultations}
          />
        </div>
      </section>

      {/* Content Area */}
      {filteredConsultations.length > 0 ? (
        <section className="animate-in slide-in-from-bottom-4 duration-500">
          {viewMode === 'grid' ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredConsultations.map((consultation) => (
                <CardDefault key={consultation.id} consultation={consultation} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredConsultations.map((consultation) => (
                <RowConsult key={consultation.id} consultation={consultation} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
