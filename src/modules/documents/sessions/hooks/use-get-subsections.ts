import { useKnowledgeGetAllNested } from "@/shared/api/generated/knowledge/knowledgeServiceAPI";

export interface SubsectionPaginationOptions {
  page?: number;
  size?: number;
}

export const useGetSubsections = (
  sectionId: string,
  pagination: SubsectionPaginationOptions = {},
) => {
  const { page = 0, size = 100 } = pagination;

  const response = useKnowledgeGetAllNested(
    sectionId,
    { page, size },
    { query: { enabled: !!sectionId } },
  );

  return response;
};
