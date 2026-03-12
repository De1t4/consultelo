import z from "zod";

export const SchemaAccount = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username must be less than 100 characters")
    .regex(
      /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ/.,!? ]+$/,
      "Only letters and numbers are allowed",
    ),
  bio: z
    .string()
    .max(255, "Bio must be less than 255 characters")
    .nullable()
    .optional(),
  profession: z
    .string()
    .max(255, "Profession must be less than 255 characters")
    .nullable()
    .optional(),
});

export type FormDataAccount = z.infer<typeof SchemaAccount>;

export const initialValuesAccount: FormDataAccount = {
  bio: "",
  profession: "",
  username: "",
};
