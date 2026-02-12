import z from "zod";

export const SchemaLogin = z.object({
  email: z.string().email({ message: "Ingrese un email válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export type FormDataLogin = z.infer<typeof SchemaLogin>;
