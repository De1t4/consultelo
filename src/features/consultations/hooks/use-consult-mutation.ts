import { createConsultationAction } from "../actions/consultation-mutation";
import { useMutation } from "@tanstack/react-query";
import { sileo } from "sileo";

const useCreateConsultation = () => {
  const {
    mutateAsync: createConsultation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: createConsultationAction,
    onSuccess: (res) => {
      if (res.success) {
        sileo.success({
          title: "Consultation created successfully",
          description:
            "Your consultation has been published and is now visible to experts.",
        });
      } else {
        sileo.error({
          title: "Error creating consultation",
          description: res.error,
        });
      }
      return res;
    },
    onError: () => {
      sileo.error({
        title: "System Error",
        description: "An unexpected error occurred. Please try again later.",
      });
    },
  });
  return { createConsultation, isPending, isSuccess };
};

export { useCreateConsultation };
