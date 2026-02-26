import {
  ConsultationCategory,
  ConsultationStatus,
} from "@/generated/prisma/enums.js";
import { ResponseConsultList } from "@/shared/types/response-consult.js";
import { useMemo, useState } from "react";

type ViewMode = "grid" | "list";

export function useConsults({
  consultations,
}: {
  consultations: ResponseConsultList[];
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterStatus, setFilterStatus] = useState<ConsultationStatus | "">("");
  const [filterCategory, setFilterCategory] = useState<
    ConsultationCategory | ""
  >("");

  const filteredConsultations = useMemo(() => {
    const data = Array.isArray(consultations) ? consultations : [];
    return data.filter((item) => {
      const matchesStatus = filterStatus ? item.status === filterStatus : true;
      const matchesCategory = filterCategory
        ? item.categories === filterCategory
        : true;
      return matchesStatus && matchesCategory;
    });
  }, [consultations, filterStatus, filterCategory]);

  return {
    filteredConsultations,
    setViewMode,
    filterStatus,
    setFilterStatus,
    setFilterCategory,
    viewMode,
  };
}
