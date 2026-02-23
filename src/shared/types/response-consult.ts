import {
  ConsultationCategory,
  ConsultationStatus,
  PrivacyType,
  QuestionType,
  UserRole,
} from "@/generated/prisma/enums";
import { JsonValue } from "@prisma/client/runtime/client";
import { JSONContent } from "@tiptap/react";

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
  settings: Settings | null;
}

export interface ResponseConsultDetail {
  id: string;
  title: string;
  body: JSONContent;
  userId: string;
  categories: ConsultationCategory;
  status: ConsultationStatus;
  createdAt: Date;
  expiresAt: Date | null;
  settings: Settings | null;
  comments: Comment[];
  user: User | null;
}

export interface Comment {
  id: string;
  message: string;
  createdAt: Date;
  userId: string | null;
  authorName: string | null;
}

interface Settings {
  id: string;
  type: QuestionType;
  privacy: PrivacyType;
  allowAnonymous: boolean;
  viewComments: boolean;
  accessCode: string | null;
  consultationId: string;
}

interface User {
  id: string;
  createdAt: Date;
  role: UserRole;
  username: string;
  email: string;
  password: string;
  phone: string | null;
  updatedAt: Date;
  isActive: boolean;
}
