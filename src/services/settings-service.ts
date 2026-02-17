import { SettingsCreateInput } from "@/generated/prisma/models/Settings";
import prisma from "@/shared/lib/prisma";

export const createSettings = async (
  idConsultation: string,
  settings: SettingsCreateInput,
) => {
  prisma.settings.create({
    data: {
      consultationId: idConsultation,
      privacy: settings.privacy,
      allowAnonymous: settings.allowAnonymous,
      viewComments: settings.viewComments,
    },
  });
};
