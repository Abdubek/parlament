import { Breadcrumbs } from "@/features/breadcrumbs";
import { Stack } from "@mantine/core";
import { setBreadcrumb } from "@/features/breadcrumbs/use-breadcrumbs";
import { useEffect } from "react";
import { MenuCard } from "./components/menu-card.tsx";
import { FolderTable } from "./components/folder-table.tsx";
import { SessionTitle } from "./components/session-title.tsx";

export function SessionsPage() {
  useEffect(() => {
    setBreadcrumb("sessions", { label: "Отырыс (Заседания)" });
  }, []);

  return (
    <Stack gap={8}>
      <Breadcrumbs startIndex={2} />
      <MenuCard />
      <Stack gap={24}>
        <SessionTitle />
        <FolderTable />
      </Stack>
    </Stack>
  );
}
