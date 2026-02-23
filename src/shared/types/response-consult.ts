import {
  ConsultationCategory,
  ConsultationStatus,
  PrivacyType,
  QuestionType,
} from "@/generated/prisma/enums";
import { JsonValue } from "@prisma/client/runtime/client";

export interface ResponseConsult {
  success: boolean;
  consultationId: string;
  title: string;
}

export interface ResponseConsultList {
  id: string;
  title: string;
  body: JsonValue;
  userId: string;
  categories: ConsultationCategory;
  status: ConsultationStatus;
  createdAt: Date;
  expiresAt: Date | null;
  settings: {
    id: string;
    type: QuestionType;
    privacy: PrivacyType;
    allowAnonymous: boolean;
    viewComments: boolean;
    accessCode: string | null;
    consultationId: string;
  } | null;
}
