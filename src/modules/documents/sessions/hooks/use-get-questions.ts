import {
  setBreadcrumbs,
  type BreadcrumbEntry,
} from "@/features/breadcrumbs/use-breadcrumbs";
import { useKnowledgeGetQuestionById } from "@/shared/api/generated/knowledge/knowledgeServiceAPI";
import { useEffect } from "react";

export const useGetQuestions = (sectionId: string) => {
  const response = useKnowledgeGetQuestionById(sectionId);

  useEffect(() => {
    setBreadcrumbs(
      response.data?.folders?.reduce(
        (acc, folder) => {
          if (folder?.id) {
            acc[folder.id] = {
              label: folder.name_ru ?? "",
              meta: {
                folderId: folder.folder_id ?? "",
                sectionId: folder.id,
              },
            };
          }
          return acc;
        },
        {} as Record<string, BreadcrumbEntry>,
      ) || {},
    );
  }, [response]);

  return response;
};
