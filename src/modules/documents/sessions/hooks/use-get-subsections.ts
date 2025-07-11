import { useKnowledgeGetAllNested } from "@/shared/api/generated/knowledge/knowledgeServiceAPI";

export const useGetSubsections = (sectionId: string) => {
  const { data } = useKnowledgeGetAllNested(
    sectionId,
    {
      // @ts-expect-error TODO: need to fix in OpenAPI schema in backend
      page: 0,
      size: 10,
    },
    { query: { enabled: !!sectionId } },
  );
  return data;
};
