import z from "zod";

export const SchemaComment = z.object({
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(255, "Message must be less than 255 characters"),
  userId: z.string().optional(),
  consultationId: z.string().optional(),
  isAnonymous: z.boolean().optional(),
});

export type FormDataComment = z.infer<typeof SchemaComment>;

export const initialValuesComment: FormDataComment = {
  message: "",
  userId: "",
};
