import z from "zod";

export const SchemaComment = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(255, "Message must be less than 255 characters"),
  authorName: z.string().optional(),
  userId: z.string().optional(),
  consultationId: z.string().optional(),
  isAnonymous: z.boolean().optional(),
});

export type FormDataComment = z.infer<typeof SchemaComment>;

export const initialValuesComment: FormDataComment = {
  message: "",
  authorName: "",
  userId: "",
};
