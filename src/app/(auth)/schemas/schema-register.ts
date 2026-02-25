import { z } from "zod";

export const SchemaRegister = z
  .object({
    email: z.string().email({ message: "Enter a valid email" }),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters",
    }),
    phone: z
      .string()
      .min(6, { message: "Phone must be at least 6 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    repeatPassword: z
      .string()
      .min(6, { message: "Repeat password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type FormDataRegister = z.infer<typeof SchemaRegister>;
