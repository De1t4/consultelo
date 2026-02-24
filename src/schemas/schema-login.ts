import z from "zod";

export const SchemaLogin = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type FormDataLogin = z.infer<typeof SchemaLogin>;
