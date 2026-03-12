"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import {
  deleteUserAction,
  updateProfileAction,
} from "../actions/user-mutation";
import { FormDataAccount } from "../schemas/schema-account";
import { signOut } from "next-auth/react";

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
