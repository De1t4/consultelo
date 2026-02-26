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
  const [sortedStatus, setSortedStatus] = useState<ConsultationStatus | "">("");
  const [sortedCategory, setSortedCategory] = useState<
    ConsultationCategory | ""
  >("");

  const filteredConsultations = useMemo(() => {
    const data = Array.isArray(consultations) ? consultations : [];
    return data.filter((item) => {
      const matchesStatus = sortedStatus ? item.status === sortedStatus : true;
      const matchesCategory = sortedCategory
        ? item.categories === sortedCategory
        : true;
      return matchesStatus && matchesCategory;
    });
  }, [consultations, sortedStatus, sortedCategory]);

  return {
    filteredConsultations,
    setViewMode,
    setSortedStatus,
    setSortedCategory,
    viewMode,
  };
}
