import z from "zod";

export const SchemaConsultation = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .regex(/^[a-zA-Z0-9 ]+$/, "Only letters and numbers are allowed"),
  body: z
    .string()
    .min(10, "Context is required")
    .refine((val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    }, "The body must be a valid JSON"),
  categories: z.enum([
    "software",
    "IA",
    "business",
    "company",
    "strategy",
    "other",
  ]),
  privacy: z.enum(["public", "private"]),
  allowAnonymous: z.boolean(),
  viewComments: z.boolean(),
});

export type FormDataConsultation = z.infer<typeof SchemaConsultation>;

export const initialValuesConsultation: FormDataConsultation = {
  title: "",
  body: "",
  categories: "other",
  privacy: "public",
  allowAnonymous: false,
  viewComments: false,
};
