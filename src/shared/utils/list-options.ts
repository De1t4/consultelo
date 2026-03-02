import {
  ConsultationCategory,
  ConsultationStatus,
} from "@/generated/prisma/enums";

export const statusOptions = [
  { label: "Draft", value: ConsultationStatus.draft },
  { label: "Active", value: ConsultationStatus.active },
  { label: "Closed", value: ConsultationStatus.closed },
  { label: "Archived", value: ConsultationStatus.archived },
];

export const categoryOptions = [
  { label: "Software", value: ConsultationCategory.software },
  { label: "AI", value: ConsultationCategory.IA },
  { label: "Business", value: ConsultationCategory.business },
  { label: "Company", value: ConsultationCategory.company },
  { label: "Strategy", value: ConsultationCategory.strategy },
  { label: "Other", value: ConsultationCategory.other },
];
