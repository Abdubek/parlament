import {
  setBreadcrumbs,
  type BreadcrumbEntry,
} from "@/features/breadcrumbs/use-breadcrumbs";
import { useKnowledgeGetAllNested } from "@/shared/api/generated/knowledge/knowledgeServiceAPI";
import { useEffect } from "react";

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

  useEffect(() => {
    setBreadcrumbs(
      data?.content?.reduce(
        (acc, subsection) => {
          if (subsection?.id) {
            acc[subsection.id] = {
              label: subsection.name_ru ?? "",
              meta: {
                folderId: subsection.folder_id ?? "",
                sectionId: subsection.id,
              },
            };
          }
          return acc;
        },
        {} as Record<string, BreadcrumbEntry>,
      ) || {},
    );
  }, [data]);

  return data;
};
