import { useKnowledgeGetQuestionById } from "@/shared/api/generated/knowledge/knowledgeServiceAPI";

export const useGetQuestions = (sectionId: string) => {
  const response = useKnowledgeGetQuestionById(sectionId);

  return response;
};
