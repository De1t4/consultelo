import z from "zod";

export const SchemaResetPassword = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Old Password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "New Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormDataResetPassword = z.infer<typeof SchemaResetPassword>;
