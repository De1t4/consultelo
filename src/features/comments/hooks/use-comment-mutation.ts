import { createCommentAction } from "@/features/comments/actions/comment-mutation";
import { useMutation } from "@tanstack/react-query";
import { sileo } from "sileo";

const useCreateComment = () => {
  const {
    mutateAsync: createComment,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: createCommentAction,
    onSuccess: (res) => {
      if (!res.success) {
        sileo.error({
          title: "Failed to create comment",
          description: res.error,
        });
        return;
      }

      sileo.success({
        title: "Comment created successfully",
        description: "Your comment has been added to the consultation.",
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
