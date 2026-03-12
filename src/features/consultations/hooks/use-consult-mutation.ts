import { ResponseConsultList } from "@/shared/types/response-consult";
import { useMutation } from "@tanstack/react-query";
import { sileo } from "sileo";
import {
  createConsultationAction,
  deleteConsultationAction,
  updateConsultationAction,
} from "../actions/consultation-mutation";
import { FormDataConsultation } from "../schemas/schema-consultation";

export const useCreateConsultation = () => {
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

export const useDeleteConsultation = () => {
  const { mutateAsync: deleteConsultation } = useMutation({
    mutationFn: (idConsultation: string) =>
      deleteConsultationAction(idConsultation),
    onSuccess: (res) => {
      if (res.success) {
        sileo.success({
          title: "Consultation deleted successfully",
          description: "The consultation has been deleted successfully",
        });
      } else {
        sileo.error({
          title: "Error deleting consultation",
          description: res.error,
        });
      }
    },
    onError: () => {
      sileo.error({
        title: "System Error",
        description: "An unexpected error occurred while deleting.",
      });
    },
  });

  return { deleteConsultation };
};

export const useUpdateConsultation = ({
  consultation,
}: {
  consultation: ResponseConsultList;
}) => {
  const { mutate: updateConsultation, isPending } = useMutation({
    mutationFn: async (data: FormDataConsultation) =>
      await updateConsultationAction(consultation.id, data),
    onSuccess: (res) => {
      if (res.success) {
        sileo.success({
          title: "Consultation updated",
          description: "Your changes have been saved successfully.",
        });
      } else {
        sileo.error({
          title: "Update failed",
          description: res.error,
        });
      }
    },
    onError: () => {
      sileo.error({
        title: "System error",
        description: "An unexpected error occurred. Please try again.",
      });
    },
  });

  return { updateConsultation, isPending };
};
