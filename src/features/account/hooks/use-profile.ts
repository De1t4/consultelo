"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfileAction } from "../actions/user-queries";

export const useProfile = () => {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await getProfileAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  return {
    profile,
    isLoading,
    isError,
    error,
  };
};
