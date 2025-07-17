import { Stack } from "@mantine/core";
import { MenuCard } from "./components/menu-card.tsx";
import { FolderTable } from "./components/folder-table.tsx";
import { SessionTitle } from "./components/session-title.tsx";
import { QuestionInfo } from "./components/question-info.tsx";
import { Breadcrumbs } from "@/features/breadcrumbs/index.tsx";
import { useSessionsBreadcrumbResolver } from "./resolver";

export function SessionsPage() {
  const breadcrumbResolver = useSessionsBreadcrumbResolver();

  return (
    <Stack gap={8}>
      <Breadcrumbs startIndex={2} resolver={breadcrumbResolver} />
      <MenuCard />
      <Stack gap={24}>
        <SessionTitle />
        <FolderTable />
        <QuestionInfo />
      </Stack>
    </Stack>
  );
}
