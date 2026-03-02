import { createCommentAction } from "@/actions/comment-mutation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { sileo } from "sileo";

const useCreateComment = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createComment,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: createCommentAction,
    onSuccess: (data) => {
      sileo.success({
        title: "Comment created successfully",
        description: "Your comment has been added to the consultation.",
      });
      queryClient.invalidateQueries({
        queryKey: ["consultation-detail", data.consultationId],
      });
      return true;
    },
    onError: (error) => {
      sileo.error({
        title: "Failed to create comment",
        description: error.message,
      });
      return false;
    },
  });
  return { createComment, isPending, isSuccess };
};

export { useCreateComment };
