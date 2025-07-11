import { Breadcrumbs } from "@/features/breadcrumbs";
import { Stack, Title } from "@mantine/core";
import { setBreadcrumb } from "@/features/breadcrumbs/use-breadcrumbs";
import { useEffect } from "react";
import { MenuCard } from "./components/menu-card.tsx";
import { FolderTable } from "./components/folder-table.tsx";

export function SessionsPage() {
  useEffect(() => {
    setBreadcrumb("sessions", { label: "Отырыс (Заседания)" });
  }, []);

  return (
    <Stack gap={8}>
      <Breadcrumbs startIndex={2} />
      <MenuCard />
      <Stack gap={24}>
        <Title order={1}>Отырыс (Заседания)</Title>
        <FolderTable />
      </Stack>
    </Stack>
  );
}
