import { useQueryClient } from "@tanstack/react-query";
import { getKnowledgeGetSectionQueryOptions } from "@/shared/api/generated/knowledge/knowledgeServiceAPI";
import type { BreadcrumbEntry } from "@/features/breadcrumbs-v2";

export const useSessionsBreadcrumbResolver = () => {
  const queryClient = useQueryClient();

  return async (id: string, index: number): Promise<BreadcrumbEntry> => {
    try {
      if (id === "sessions") {
        return {
          label: "Отырыс (Заседания)",
          href: "/cabinet/documents/sessions",
        };
      }

      const queryOptions = getKnowledgeGetSectionQueryOptions(id);

      let section = queryClient.getQueryData(queryOptions.queryKey);

      if (!section) {
        section = await queryClient.fetchQuery({
          ...queryOptions,
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000, // 10 minutes
        });
      }

      if (!section) {
        throw new Error(`Section with id ${id} not found`);
      }

      const label = section.name_ru || section.name_kz || id;

      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      const baseIndex = pathSegments.findIndex(
        (segment) => segment === "sessions",
      );

      if (baseIndex === -1) {
        throw new Error("Sessions path not found in current URL");
      }

      const href = "/" + pathSegments.slice(0, baseIndex + 2 + index).join("/");

      return {
        label,
        href,
      };
    } catch (error) {
      console.error("Error resolving breadcrumb:", error);

      return {
        label: id,
        href: `/documents/sessions/${id}`,
      };
    }
  };
};
