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
  success?: boolean;
  consultationId?: string;
  title?: string;
  error?: string;
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
  _count: {
    comments: number;
  };
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
  user: User | null;
  comments: Comment[] | null;
  _count: {
    comments: number;
  };
}

export interface Comment {
  id: string;
  message: string;
  createdAt: Date;
  userId: string | null;
  user: {
    username: string;
    email: string;
  } | null;
}

interface Settings {
  id: string;
  type: QuestionType;
  privacy: PrivacyType;
  allowAnonymous: boolean;
  viewComments: boolean;
  consultationId: string;
}

interface User {
  id: string;
  createdAt: Date;
  role: UserRole;
  username: string;
  email: string;
  updatedAt: Date;
  isActive: boolean;
}
