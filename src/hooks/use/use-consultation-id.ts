import { getCommentsByConsultationIdAction } from "@/actions/comment-queries";
import { getConsultationByIdAction } from "@/actions/consultation-queries";
import { useQuery } from "@tanstack/react-query";

export const useConsultationId = ({ idParams }: { idParams: string }) => {
  const {
    data: consultation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["consultation-detail", idParams],
    queryFn: () => getConsultationByIdAction(idParams),
  });

  const { data: comments, isLoading: isLoadingComment } = useQuery({
    queryKey: ["comments", idParams],
    queryFn: () => getCommentsByConsultationIdAction(idParams),
  });

  return {
    consultation,
    isLoading,
    error,
    comments,
    isLoadingComment,
  };
};
