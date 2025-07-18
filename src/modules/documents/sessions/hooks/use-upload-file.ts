import { useKnowledgeGetSection } from "@/shared/api/generated/knowledge/knowledgeServiceAPI";
import { useSectionParams } from "./use-section-params";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { knowledgeApiMutator } from "@/shared/api/api-mutators";
import dayjs from "dayjs";

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  const { mutate: uploadFileMutation, isPending } = useMutation({
    mutationFn: (formData: FormData) => {
      return knowledgeApiMutator<void>({
        url: `/api/v1/section/upload-subsection-file`,
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/api/v1/section/get-all/${parentSectionId}`],
      });
    },
  });

  const { lastSectionId: parentSectionId } = useSectionParams();
  const { data: sectionData } = useKnowledgeGetSection(parentSectionId ?? "", {
    query: { staleTime: 5 * 60 * 1000 },
  });
  const parentFolderId = sectionData?.folder_id ?? "";

  const handleUploadFile = (files: File[]) => {
    files.forEach((file) => {
      const formData = new FormData();

      const request = new Blob(
        [
          JSON.stringify({
            name_ru: file.name,
            name_kz: file.name,
            parent_section_id: parentSectionId,
            parent_folder_id: parentFolderId,
            meeting_date: dayjs().format("YYYY-MM-DD"),
          }),
        ],
        { type: "application/json" },
      );

      formData.append("request", request);
      formData.append("file", file);

      uploadFileMutation(formData);
    });
  };

  return { handleUploadFile, isPending };
};
