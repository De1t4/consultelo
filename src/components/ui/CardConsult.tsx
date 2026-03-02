'use client'

import ConsultationToogle from '@/app/(owner)/my-consultations/components/ConsultationToogle';
import { ConsultationCategory, ConsultationStatus, PrivacyType } from '@/generated/prisma/enums';
import { ResponseConsultList } from '@/shared/types/response-consult';
import { Calendar, Globe, Lock, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import RichTextDisplay from './RichTextDisplay';

const categoryStyles: Record<ConsultationCategory, string> = {
  'software': 'bg-orange-100 text-orange-600',
  'IA': 'bg-blue-100 text-blue-600',
  'business': 'bg-green-100 text-green-600',
  'company': 'bg-purple-100 text-purple-600',
  'strategy': 'bg-yellow-100 text-yellow-600',
  'other': 'bg-gray-100 text-gray-600',
};


const statusStyles: Record<ConsultationStatus, string> = {
  'draft': 'bg-orange-100 text-orange-600',
  'active': 'bg-green-100 text-green-700',
  'closed': 'bg-gray-100 text-gray-500',
  'archived': 'bg-blue-100 text-blue-700',
};

const statusDot: Record<ConsultationStatus, string> = {
  'draft': 'bg-orange-500',
  'active': 'bg-green-500',
  'closed': 'bg-gray-500',
  'archived': 'bg-blue-500',
};

const visibilityIcon: Record<PrivacyType, React.ReactNode> = {
  'private': <Lock className="h-3.5 w-3.5" />,
  'public': <Globe className="h-3.5 w-3.5" />,
};

export default function CardConsult({ consultation }: { consultation: ResponseConsultList }) {
  return (
    <Link href={`/consultation/${consultation.id}`} className='bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col gap-3 h-full relative group'>
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[consultation.status]}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[consultation.status]}`} />
            {consultation.status.toUpperCase()}
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-foreground font-medium opacity-60">#{consultation.id.slice(0, 8)}</span>
        </div>
        <ConsultationToogle consultation={consultation} />
      </div>
      {/* Title */}
      <h3 className="font-semibold text-primary leading-snug text-lg line-clamp-1">
        {consultation.title}
      </h3>
      {/* Description */}
      <RichTextDisplay content={JSON.stringify(consultation.body)} classname='line-clamp-2' />

      <div className="">
        <span className={`text-[10px] font-bold tracking-wide px-2 py-1 rounded-full ${categoryStyles[consultation.categories]}`}>
          {consultation.categories.toUpperCase()}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-border flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar className="h-3.5 w-3.5" />
          {consultation.createdAt.toDateString()}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          {visibilityIcon[consultation.settings?.privacy || 'private']}
          {consultation.settings?.privacy}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <MessageSquare className="h-3.5 w-3.5" />
          {consultation._count.comments} comments
        </div>

      </div>
    </Link>

  )
}
