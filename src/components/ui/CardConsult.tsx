'use client'

import { ConsultationCategory, ConsultationStatus, PrivacyType } from '@/generated/prisma/enums';
import { ResponseConsultList } from '@/shared/types/response-consult';
import { Archive, Calendar, Edit, Globe, Lock, MessageSquare, MoreVertical, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <Link href={`/consultation/${consultation.id}`} className='bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col gap-3 h-full relative group'>
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold tracking-wide px-2 py-1 rounded-full ${categoryStyles[consultation.categories]}`}>
            {consultation.categories.toUpperCase()}
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-foreground font-medium opacity-60">#{consultation.id.slice(0, 8)}</span>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-all text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in duration-200">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMenu(false); /* Edit logic */ }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-accent/90 transition-colors"
              >
                <Edit className="h-4 w-4 text-foreground" />
                <span className='text-foreground'>Edit details</span>
              </button>
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMenu(false); /* Archive logic */ }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-accent/90 transition-colors"
              >
                <Archive className="h-4 w-4 text-foreground" />
                <span className='text-foreground'>Archive</span>
              </button>
              <div className="h-px bg-muted-foreground my-1.5" />
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMenu(false); /* Delete logic */ }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:dark:bg-red-950 transition-colors font-medium"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Title */}
      <h3 className="font-semibold text-primary leading-snug text-lg">
        {consultation.title}
      </h3>
      {/* Description */}
      <RichTextDisplay content={JSON.stringify(consultation.body)} classname='line-clamp-2' />
      {/* Footer */}
      <div className="flex items-center gap-3 pt-1 border-t border-gray-100 flex-wrap">
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
        <div className="ml-auto">
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[consultation.status]}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[consultation.status]}`} />
            {consultation.status.toUpperCase()}
          </span>
        </div>
      </div>
    </Link>

  )
}
