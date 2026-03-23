import { useQuery } from "@tanstack/react-query";
import { getPublicConsultationsAction, getUserStatsAction } from "../actions/consultation-queries";
import { Session } from "next-auth";

export const useStatsDashboard = (session: Session | null) => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const res = await getUserStatsAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: !!session,
  });

  return {
    stats,
    statsLoading,
  }
}

export const usePublicConsultations = () => {
  const { data: publicConsultations, isLoading: consultationsLoading } = useQuery({
    queryKey: ["public-consultations"],
    queryFn: async () => {
      const res = await getPublicConsultationsAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  return {
    publicConsultations,
    consultationsLoading,
  }
}
