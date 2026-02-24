'use client'

import { ConsultationCategory, ConsultationStatus, PrivacyType } from '@/generated/prisma/enums';
import { ResponseConsultList } from '@/shared/types/response-consult';
import { JSONContent, generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Calendar, Globe, Lock, MessageSquare, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

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

export default function Card({ inquiry }: { inquiry: ResponseConsultList }) {
  const output = useMemo(() => {
    return generateHTML(inquiry.body as JSONContent, [StarterKit])
  }, [inquiry.body])

  return (

    <Link href={`/consultation/${inquiry.id}`}>
      <li className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold tracking-wide px-2 py-1 rounded-full ${categoryStyles[inquiry.categories]}`}>
              {inquiry.categories.toUpperCase()}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-foreground">{inquiry.id}</span>
          </div>
          <button className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-400">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
        {/* Title */}
        <h3 className="font-semibold text-primary leading-snug text-lg">
          {inquiry.title}
        </h3>
        {/* Description */}
        <div
          className="prose prose-slate max-w-none mb-4 line-clamp-2" // 'prose' de Tailwind Typography le da el estilo
          dangerouslySetInnerHTML={{ __html: output }}
        />
        {/* Footer */}
        <div className="flex items-center gap-3 pt-1 border-t border-gray-100 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            {inquiry.createdAt.toDateString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            {visibilityIcon[inquiry.settings?.privacy || 'private']}
            {inquiry.settings?.privacy}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <MessageSquare className="h-3.5 w-3.5" />
            {inquiry._count.comments} comments
          </div>
          <div className="ml-auto">
            <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[inquiry.status]}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${statusDot[inquiry.status]}`} />
              {inquiry.status.toUpperCase()}
            </span>
          </div>
        </div>
      </li>
    </Link>

  )
}
