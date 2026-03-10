import { z } from "zod";
import {
  ConsultationCategory,
  ConsultationStatus,
  PrivacyType,
  QuestionType,
  UserRole,
} from "@/generated/prisma/enums";

// Shared Schemas
const SettingsSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(QuestionType),
  privacy: z.nativeEnum(PrivacyType),
  allowAnonymous: z.boolean(),
  viewComments: z.boolean(),
  consultationId: z.string(),
});

const UserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  role: z.nativeEnum(UserRole),
  username: z.string(),
  email: z.string().email(),
  updatedAt: z.date(),
  isActive: z.boolean(),
});

// Output DTOs
export const ConsultationListSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.any(),
  userId: z.string(),
  categories: z.nativeEnum(ConsultationCategory),
  status: z.nativeEnum(ConsultationStatus),
  createdAt: z.date(),
  expiresAt: z.date().nullable(),
  updatedAt: z.date(),
  settings: SettingsSchema.nullable(),
  _count: z.object({
    comments: z.number(),
  }),
});

export const ConsultationDetailSchema = ConsultationListSchema.extend({
  user: UserSchema.nullable(),
  comments: z
    .array(
      z.object({
        id: z.string(),
        message: z.string(),
        createdAt: z.date(),
        userId: z.string().nullable(),
        user: z
          .object({
            username: z.string(),
            email: z.string().email(),
          })
          .nullable(),
      }),
    )
    .nullable(),
});

export const UserStatsSchema = z.object({
  activeConsultations: z.number(),
  totalResponses: z.number(),
  communityImpact: z.string(),
});

// Types inferred from schemas
export type ConsultationListDTO = z.infer<typeof ConsultationListSchema>;
export type ConsultationDetailDTO = z.infer<typeof ConsultationDetailSchema>;
export type UserStatsDTO = z.infer<typeof UserStatsSchema>;
export type CreateConsultationResponseDTO = {
  consultationId: string;
  title: string;
};
