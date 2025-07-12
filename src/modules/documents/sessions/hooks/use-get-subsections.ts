import {
  setBreadcrumbs,
  type BreadcrumbEntry,
} from "@/features/breadcrumbs/use-breadcrumbs";
import { useKnowledgeGetAllNested } from "@/shared/api/generated/knowledge/knowledgeServiceAPI";
import { useEffect } from "react";

export interface SubsectionPaginationOptions {
  page?: number;
  size?: number;
}

export const useGetSubsections = (
  sectionId: string,
  pagination: SubsectionPaginationOptions = {},
) => {
  const { page = 0, size = 100 } = pagination;

  const { data } = useKnowledgeGetAllNested(
    sectionId,
    // @ts-expect-error TODO: The OpenAPI schema exposes `page` & `size` as query params, but the types are incorrect.
    { page, size },
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
