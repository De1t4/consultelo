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
      if (!data.success) {
        sileo.error({
          title: "Failed to create comment",
          description: data.error,
        });
        return;
      }

      sileo.success({
        title: "Comment created successfully",
        description: "Your comment has been added to the consultation.",
      });
      queryClient.invalidateQueries({
        queryKey: ["consultation-detail", data.value.consultationId],
      });
    },
    onError: (error) => {
      sileo.error({
        title: "Failed to create comment",
        description: error.message,
      });
    },
  });
  return { createComment, isPending, isSuccess };
};

export { useCreateComment };
