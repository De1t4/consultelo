'use client'

import { ResponseConsultDetail } from '@/shared/types/response-consult';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { CheckCircle, MoreHorizontal, Share2, User } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '../ui/Button';

export default function PrincipalConsult({ consultation }: { consultation: ResponseConsultDetail }) {
  const output = useMemo(() => {
    return generateHTML(consultation.body, [StarterKit])
  }, [consultation.body])

  return (
    <article className="bg-card border-border rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-primary bg-teal-50 px-2 py-1 rounded">
            {consultation.status === 'active' ? 'Open Request' : consultation.status}
          </span>
          <span className="text-xs text-muted-foreground">
            ID: #{consultation.id.slice(0, 8).toUpperCase()} • Created {new Date(consultation.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant='outline' className='flex justify-center gap-2 items-center'>
            <CheckCircle className="h-4 w-4" />
            Submit Proposal
          </Button>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-primary mb-6 ">
        {consultation.title}
      </h1>

      {/* Author Info */}
      <div className="flex items-start gap-4 mb-6">
        <User className='h-10 w-10 rounded-full object-cover bg-muted p-1 text-muted-foreground' />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{consultation.user?.username}</h3>
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded uppercase">
              {consultation.user?.role}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{consultation.user?.email} • Posted {new Date(consultation.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Description */}
      <div
        className="prose prose-slate max-w-none mb-4" // 'prose' de Tailwind Typography le da el estilo
        dangerouslySetInnerHTML={{ __html: output }}
      />


      {/* Tags */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <div className="flex gap-2">
          <span className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full capitalize">
            {consultation.categories}
          </span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
