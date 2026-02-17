import z from "zod";

export const SchemaConsultation = z.object({
  title: z.string().min(1, "El título es requerido"),
  body: z.string().min(1, "La descripción es requerida"),
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
