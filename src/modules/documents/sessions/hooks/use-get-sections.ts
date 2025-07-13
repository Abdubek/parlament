import {
  setBreadcrumbs,
  type BreadcrumbEntry,
} from "@/features/breadcrumbs/use-breadcrumbs";
import {
  useKnowledgeGetAll,
  useKnowledgeGetAllNested,
} from "@/shared/api/generated/knowledge/knowledgeServiceAPI.ts";
import { useEffect } from "react";

const SESSION_NAME = "MEETINGS";

export const useGetSections = () => {
  const { data: sessions } = useKnowledgeGetAll({
    page: 0,
    size: 10,
  });

  const session = sessions?.content?.find(
    (session) => session.name_ru === SESSION_NAME,
  );

  const { data: sections } = useKnowledgeGetAllNested(
    session?.id ?? "",
    {
      page: 0,
      size: 10,
    },
    { query: { enabled: !!session } },
  );

  useEffect(() => {
    setBreadcrumbs(
      sections?.content?.reduce(
        (acc, section) => {
          if (section?.id) {
            acc[section.id] = {
              label: section.name_ru ?? "",
              meta: {
                folderId: section.folder_id ?? "",
                sectionId: section.id,
              },
            };
          }
          return acc;
        },
        {} as Record<string, BreadcrumbEntry>,
      ) || {},
    );
  }, [sections]);

  return sections;
};
