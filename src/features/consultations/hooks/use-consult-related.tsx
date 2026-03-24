import { useQuery } from "@tanstack/react-query";
import { getRelatedConsultationsAction } from "../actions/consultation-queries";

export const useRelatedConsultations = ({
  idConsultation,
  idUser,
  category,
}: {
  idConsultation: string;
  idUser: string;
  category: string;
}) => {
  const {
    data: consultation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["consultation-related", idConsultation, idUser, category],
    queryFn: () =>
      getRelatedConsultationsAction({ idConsultation, idUser, category }),
  });

  return {
    consultation,
    isLoading,
    error,
  };
};
