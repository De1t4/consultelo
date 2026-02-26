import { ConsultationCategory, ConsultationStatus } from "@/generated/prisma/enums";
import { ResponseConsultList } from "@/shared/types/response-consult";
import { Calendar, MessageSquare, MoreVertical } from "lucide-react";

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

export default function RowConsult({ consultation }: { consultation: ResponseConsultList }) {
  return (
    <div className="bg-card border border-border max-md:flex-col rounded-xl px-5 py-4 hover:shadow-sm transition-shadow flex items-center gap-4">
      <div className="flex-1 min-w-50 max-md:w-full">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-xs font-bold tracking-wide ${categoryStyles}`}>
            {consultation.categories}
          </span>
          <span className="text-gray-300 text-xs">•</span>
          <span className="text-xs text-gray-400">{consultation.id}</span>
        </div>
        <h3 className="font-semibold text-primary text-sm truncate">{consultation.title}</h3>
      </div>
      <div className="flex justify-center gap-4 items-center max-md:w-full max-md:justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
          <Calendar className="h-3.5 w-3.5" />
          {consultation.createdAt.toDateString()}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
          <MessageSquare className="h-3.5 w-3.5" />
          {consultation._count.comments}
        </div>
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusStyles[consultation.status]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[consultation.status]}`} />
          {consultation.status.toUpperCase()}
        </span>
        <button className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-400 shrink-0">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}