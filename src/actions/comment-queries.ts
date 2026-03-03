// "use server";

// import { getCommentsByConsultationId } from "@/services/comment-service";
// import { executeAction } from "@/shared/types/executionAction";
// import { isValidId } from "@/shared/utils/validates";

// export async function getCommentsByConsultationIdAction(
//   idConsultation: string,
// ) {
//   return await executeAction({
//     actionFn: async () => {
//       isValidId(idConsultation);
//       const comments = await getCommentsByConsultationId(idConsultation);
//       return comments;
//     },
//   });
// }
