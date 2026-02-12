import { z } from "zod";

export const SchemaRegister = z
  .object({
    email: z.string().email({ message: "Ingrese un email válido" }),
    username: z.string().min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    }),
    phone: z
      .string()
      .min(6, { message: "El teléfono debe tener al menos 6 caracteres" }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    repeatPassword: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"],
  });

export type FormDataRegister = z.infer<typeof SchemaRegister>;
