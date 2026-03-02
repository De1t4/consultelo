import {
  ConsultationCategory,
  ConsultationStatus,
} from "@/generated/prisma/enums";
import { ResponseConsultList } from "@/shared/types/response-consult";
import { useMemo, useState } from "react";

type ViewMode = "grid" | "list";

interface UseConsultsProps {
  consultations: ResponseConsultList[];
}

export function useConsults({ consultations }: UseConsultsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterStatus, setFilterStatus] = useState<ConsultationStatus | "">("");
  const [filterCategory, setFilterCategory] = useState<
    ConsultationCategory | ""
  >("");

  const filteredConsultations = useMemo(() => {
    const data = Array.isArray(consultations) ? consultations : [];

    return data.filter((item) => {
      const matchesStatus = !filterStatus || item.status === filterStatus;
      const matchesCategory =
        !filterCategory || item.categories === filterCategory;

      return matchesStatus && matchesCategory;
    });
  }, [consultations, filterStatus, filterCategory]);

  const resetFilters = () => {
    setFilterStatus("");
    setFilterCategory("");
  };

  return {
    // Data
    viewMode,
    filterStatus,
    filterCategory,
    filteredConsultations,

    // Actions
    setViewMode,
    setFilterStatus,
    setFilterCategory,
    resetFilters,
  };
}
