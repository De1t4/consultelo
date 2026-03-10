import z from "zod";

export const SchemaConsultation = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .regex(
      /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ/.,!? ]+$/,
      "Only letters and numbers are allowed",
    ),
  body: z
    .string()
    .min(1, "Context is required")
    .refine((val) => {
      try {
        const parsed = JSON.parse(val);
        // Check if there is any text content in the Tiptap structure
        interface TiptapNode {
          text?: string;
          content?: TiptapNode[];
        }
        const hasText = (nodes: TiptapNode[]): boolean => {
          return nodes.some((node) => {
            if (node.text && node.text.trim().length > 0) return true;
            if (node.content) return hasText(node.content);
            return false;
          });
        };
        return parsed.content && hasText(parsed.content as TiptapNode[]);
      } catch {
        return false;
      }
    }, "Context must not be empty"),
  categories: z.string().min(1, "Category is required"),
  privacy: z.enum(["public", "private"]),
  allowAnonymous: z.boolean(),
  viewComments: z.boolean(),
  status: z.enum(["draft", "active", "closed", "archived"]).optional(),
});

export type FormDataConsultation = z.infer<typeof SchemaConsultation>;

export const initialValuesConsultation: FormDataConsultation = {
  title: "",
  body: "",
  categories: "",
  privacy: "public",
  allowAnonymous: false,
  viewComments: false,
  status: "active",
};
