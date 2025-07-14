import { Breadcrumbs } from "@/features/breadcrumbs";
import { Stack } from "@mantine/core";
import { setBreadcrumb } from "@/features/breadcrumbs/use-breadcrumbs";
import { useEffect } from "react";
import { MenuCard } from "./components/menu-card.tsx";
import { FolderTable } from "./components/folder-table.tsx";
import { SessionTitle } from "./components/session-title.tsx";
import { QuestionInfo } from "./components/question-info.tsx";
import { BreadcrumbsV2 } from "@/features/breadcrumbs-v2";
import { useSessionsBreadcrumbResolver } from "./resolver";

export function SessionsPage() {
  const breadcrumbResolver = useSessionsBreadcrumbResolver();

  useEffect(() => {
    setBreadcrumb("sessions", { label: "Отырыс (Заседания)" });
  }, []);

  return (
    <Stack gap={8}>
      <Breadcrumbs startIndex={2} />
      <BreadcrumbsV2 startIndex={2} resolver={breadcrumbResolver} />
      <MenuCard />
      <Stack gap={24}>
        <SessionTitle />
        <FolderTable />
        <QuestionInfo />
      </Stack>
    </Stack>
  );
}
