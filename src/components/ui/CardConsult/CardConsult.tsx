'use client'

import ConsultationToogle from '@/app/(owner)/my-consultations/components/ConsultationToogle';
import { ConsultationCategory, ConsultationStatus, PrivacyType } from '@/generated/prisma/enums';
import { ResponseConsultList } from '@/shared/types/response-consult';
import { JsonValue } from '@prisma/client/runtime/client';
import { Calendar, Globe, Lock, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import RichTextDisplay from '../RichTextDisplay';

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



const Footer = ({ date, privacy, totalComments }: { date: string, privacy: PrivacyType, totalComments: number }) => {
  return (
    <div className="flex items-center justify-between gap-3 pt-3 border-t border-border flex-wrap">
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <Calendar className="h-3.5 w-3.5" />
        {date}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        {visibilityIcon[privacy]}
        {privacy}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <MessageSquare className="h-3.5 w-3.5" />
        {totalComments} comments
      </div>
    </div>
  )
}

const Description = ({ body, category }: { body: JsonValue, category: ConsultationCategory }) => {
  return (
    <>
      <RichTextDisplay content={JSON.stringify(body)} classname='line-clamp-2' />

      <div className="">
        <span className={`text-[10px] font-bold tracking-wide px-2 py-1 rounded-full ${categoryStyles[category]}`}>
          {category.toUpperCase()}
        </span>
      </div>
    </>
  )
}

const Title = ({ title }: { title: string }) => {
  return (
    <>
      <h3 className="font-semibold text-primary leading-snug text-lg line-clamp-1 group-hover:text-primary/80 transition-colors">
        {title}
      </h3>
    </>
  )
}

const Container = ({ consultationId, children }: { consultationId: string, children: React.ReactNode }) => {
  return (
    <>
      <Link href={`/consultation/${consultationId.toString()}`} className='bg-card border border-border rounded-xl p-5 hover:dark:shadow-gray-800 hover:shadow-md transition-shadow flex flex-col gap-3 h-full relative group'>
        {children}
      </Link>
    </>
  )
}


const Overlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        {children}
      </div>
    </>
  )
}

const Toogle = ({ consultation }: { consultation: ResponseConsultList }) => {
  return (
    <>
      <ConsultationToogle consultation={consultation} />
    </>
  )
}

const Features = ({ status, consultationId }: { status: ConsultationStatus, consultationId: string }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[status]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`} />
          {status.toUpperCase()}
        </span>
        <span className="text-gray-300">•</span>
        <span className="text-xs text-foreground font-medium opacity-60">#{consultationId.slice(0, 8)}</span>
      </div>
    </>
  )
}

export const PropertyCard = {
  Features,
  Toogle,
  Overlay,
  Container,
  Title,
  Description,
  Footer
};
