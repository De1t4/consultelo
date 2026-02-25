import { createConsultationAction } from "@/actions/consultation-mutation";
import { useMutation } from "@tanstack/react-query";
import { sileo } from "sileo";

const useCreateConsultation = () => {
  const {
    mutateAsync: createConsultation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: createConsultationAction,
    onSuccess: (data) => {
      sileo.success({
        title: "Consultation created successfully",
        description:
          "Your consultation has been published and is now visible to experts.",
      });
      return data;
    },
    onError: (error) => {
      sileo.error({
        title: "Error creating consultation",
        description:
          "Your consultation could not be published. Please try again. " +
          error.message,
      });
    },
  });
  return { createConsultation, isPending, isSuccess };
};

export { useCreateConsultation };
