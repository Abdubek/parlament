import {
  useKnowledgeGetAll,
  useKnowledgeGetAllNested,
} from "@/shared/api/generated/knowledge/knowledgeServiceAPI";

const SESSION_NAME = "MEETINGS";

export const useGetSections = () => {
  const { data: sessions } = useKnowledgeGetAll({
    // @ts-expect-error TODO: need to fix in OpenAPI schema in backend
    page: 0,
    size: 10,
  });

  const session = sessions?.content?.find(
    (session) => session.name_ru === SESSION_NAME,
  );

  const { data: sections } = useKnowledgeGetAllNested(
    session?.id ?? "",
    {
      // @ts-expect-error TODO: need to fix in OpenAPI schema in backend
      page: 0,
      size: 10,
    },
    { query: { enabled: !!session } },
  );

  return sections;
};
