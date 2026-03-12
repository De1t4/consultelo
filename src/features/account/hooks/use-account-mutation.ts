"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { sileo } from "sileo";
import {
  deleteUserAction,
  resetPasswordAction,
  updateProfileAction,
} from "../actions/user-mutation";
import { FormDataAccount } from "../schemas/schema-account";
import { FormDataResetPassword } from "../schemas/schema-reset-password";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (data: FormDataAccount) => {
      const res = await updateProfileAction(data);
      if (!res.success) throw new Error(res.error);
      return res;
    },
    onSuccess: () => {
      sileo.success({
        title: "Success",
        description: "Profile updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => {
      sileo.error({
        title: "Error",
        description: error.message || "Profile could not be updated",
      });
    },
  });

  return { updateProfile, isPending };
};

export const useDeleteAccount = () => {
  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: async () => {
      const res = await deleteUserAction();
      if (!res.success) throw new Error(res.error);
      return res;
    },
    onSuccess: () => {
      sileo.success({
        title: "Success",
        description: "Account deleted successfully",
      });
      signOut();
    },
    onError: (error: Error) => {
      sileo.error({
        title: "Error",
        description: error.message || "Account could not be deleted",
      });
    },
  });

  return { deleteAccount, isPending };
};

export const useResetPassword = () => {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: async (data: FormDataResetPassword) => {
      const res = await resetPasswordAction(data.oldPassword, data.newPassword);
      if (!res.success) throw new Error(res.error);
      return res;
    },
    onSuccess: () => {
      sileo.success({
        title: "Success reset password",
        description: "Password reset successfully",
      });
    },
    onError: (error: Error) => {
      sileo.error({
        title: "Error reset password",
        description: error.message || "Password could not be reset",
      });
    },
  });

  return { resetPassword, isPending };
};
