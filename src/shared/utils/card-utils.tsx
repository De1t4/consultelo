import { ConsultationCategory, ConsultationStatus, PrivacyType } from "@/generated/prisma/enums";
import { Globe, Lock } from "lucide-react";

export const categoryStyles: Record<ConsultationCategory, string> = {
  'software': 'bg-orange-100 text-orange-600',
  'IA': 'bg-blue-100 text-blue-600',
  'business': 'bg-green-100 text-green-600',
  'company': 'bg-purple-100 text-purple-600',
  'strategy': 'bg-yellow-100 text-yellow-600',
  'other': 'bg-gray-100 text-gray-600',
};


export const statusStyles: Record<ConsultationStatus, string> = {
  'draft': 'bg-orange-100 text-orange-600',
  'active': 'bg-green-100 text-green-700',
  'closed': 'bg-gray-100 text-gray-500',
  'archived': 'bg-blue-100 text-blue-700',
};

export const statusDot: Record<ConsultationStatus, string> = {
  'draft': 'bg-orange-500',
  'active': 'bg-green-500',
  'closed': 'bg-gray-500',
  'archived': 'bg-blue-500',
};

export const visibilityIcon: Record<PrivacyType, React.ReactNode> = {
  'private': <Lock className="h-3.5 w-3.5" />,
  'public': <Globe className="h-3.5 w-3.5" />,
};
